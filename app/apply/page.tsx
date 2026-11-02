// app/apply/page.tsx
"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GridBackground from "@/components/GridBackground";
import SchoolSelect from "@/components/SchoolSelect";
import { Application, ShortUser, User } from "@/types/types";
import {
  APPLICATIONS_OPEN,
  ETHNICITY_OPTIONS,
  MAJORS_OPTIONS,
  STATE_OPTIONS,
} from "../const";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

type FormData = {
  userId: string;
  firstName: string;
  lastName: string;
  gender: string;
  pronouns: string;
  age: string;
  ethnicity: string;
  gradYear: string;
  phoneNumber: string;
  email: string;
  school: string;
  city: string;
  state: string;
  country: string;
  educationLevel: string;
  major: string;
  diet: string;
  shirtSize: string;
  sleep: boolean;
  github: string;
  linkedin: string;
  portfolio: string;
  whyBostonhacks: string;
  resume: File | undefined;
  agreeToTerms: boolean;
  authorizeDataUse: boolean;
  authorizeMLHEmail: boolean;
};

// Unchanged from last year — field names/keys here are already verified
// against Application.controller.js, formDataTransform.js and the Zod
// schema, so this logic stays exactly as it was, only the JSX around it
// is new.
const createApplicationData = (inputData: FormData) => {
  if (!inputData.resume) throw new Error("Resume file is required");

  const formData = new FormData();
  formData.append("applicationYear", new Date().getFullYear().toString());
  formData.append("userId", inputData.userId);
  formData.append("gender", inputData.gender);
  formData.append("pronouns", inputData.pronouns);
  formData.append("age", inputData.age);
  formData.append("ethnicity", inputData.ethnicity);
  formData.append("gradYear", inputData.gradYear);
  formData.append("phoneNumber", inputData.phoneNumber);
  formData.append("school", inputData.school);
  formData.append("city", inputData.city);
  formData.append("state", inputData.state);
  formData.append("country", inputData.country);
  formData.append("educationLevel", inputData.educationLevel);
  formData.append("major", inputData.major);
  formData.append("diet", inputData.diet);
  formData.append("shirtSize", inputData.shirtSize);
  formData.append("sleep", inputData.sleep.toString());
  formData.append("github", inputData.github || "http://empty.empty");
  formData.append("linkedin", inputData.linkedin || "http://empty.empty");
  formData.append("portfolio", inputData.portfolio || "http://empty.empty");
  formData.append("whyBostonhacks", inputData.whyBostonhacks);
  formData.append("resume", inputData.resume);
  formData.append("authorizeMLHEmail", inputData.authorizeMLHEmail.toString());

  return formData;
};

const inputClass =
  "w-full rounded border-2 border-black/20 bg-white px-3 py-2 text-base font-akshar focus:border-black focus:outline-none sm:text-sm";
// text-base below sm: iOS Safari auto-zooms the page into any focused field whose
// text is under 16px (and leaves it zoomed), which made the form jump on phones.
const selectClass = inputClass;
const labelClass = "mb-1 block text-sm font-bold font-helvetica";
const fieldsetClass = "mb-6 rounded border-2 border-black/10 p-4";
const legendClass = "px-1 text-sm font-bold font-helvetica";
const buttonClass =
  "rounded bg-black px-8 py-2 font-helvetica font-bold text-white hover:bg-black/80 disabled:opacity-50";

const CenteredCard = ({ children }: { children: React.ReactNode }) => (
  <section className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-white px-6 font-akshar text-black">
    <GridBackground />
    <div className="relative w-full max-w-md rounded border-2 border-black/10 bg-white p-6 text-center">
      {children}
    </div>
  </section>
);

export default function ApplyPage() {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    userId: "",
    firstName: "",
    lastName: "",
    gender: "",
    pronouns: "",
    age: "",
    ethnicity: "",
    gradYear: "",
    phoneNumber: "",
    email: "", // display only, backend doesn't accept this field
    school: "",
    city: "",
    state: "",
    country: "",
    educationLevel: "",
    major: "",
    diet: "",
    shirtSize: "",
    sleep: false,
    github: "",
    linkedin: "",
    portfolio: "",
    whyBostonhacks: "",
    resume: undefined,
    agreeToTerms: false,
    authorizeDataUse: false,
    authorizeMLHEmail: false,
  });

  useEffect(() => {
    const checkAuth = async () => {
      if (!APPLICATIONS_OPEN) {
        setPageLoading(false);
        return;
      }
      try {
        const response = await fetch(`${API_BASE}/user/me`, {
          credentials: "include",
        });
        if (!response.ok) {
          router.push("/login");
          return;
        }

        const shortUserData: ShortUser = await response.json();
        const userDataResponse = await fetch(
          `${API_BASE}/user?id=${shortUserData.id}&include=true`,
          { credentials: "include" },
        );
        if (!userDataResponse.ok)
          throw new Error("Failed to fetch applications");

        const userData: User = await userDataResponse.json();
        const applications: Application[] = userData.applications || [];
        const currentYear = new Date().getFullYear();
        const hasApplied = applications.some(
          (app) => app.applicationYear === currentYear,
        );

        if (hasApplied) {
          setAlreadySubmitted(true);
          return;
        }
        setFormData((prev) => ({
          ...prev,
          email: userData.email,
          userId: userData.id,
        }));
      } catch (err) {
        console.error("Error checking authentication:", err);
        setError(
          "There was an error processing your request. Please try again later.",
        );
      } finally {
        setPageLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || undefined;
    setFormData((prev) => ({ ...prev, resume: file }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const userUpdateResponse = await fetch(
        `${API_BASE}/user/${formData.userId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
          }),
        },
      );
      if (!userUpdateResponse.ok) {
        setError(
          "There was an error updating your user information. Please try again.",
        );
        return;
      }

      const applicationCreateResponse = await fetch(`${API_BASE}/application`, {
        method: "POST",
        credentials: "include",
        body: createApplicationData(formData),
      });

      if (!applicationCreateResponse.ok) {
        const errorData = await applicationCreateResponse
          .json()
          .catch(() => null);
        if (errorData?.error && Array.isArray(errorData.error)) {
          const messages = errorData.error
            .map((e: { message: string }) => e.message || "")
            .join(", ");
          setError(`Application submission failed: ${messages}`);
        } else {
          setError(
            "There was an error submitting your application. Please try again or contact us.",
          );
        }
        return;
      }

      setSubmissionSuccess(true);
    } catch (err) {
      console.error("Error submitting application:", err);
      setError(
        "There was an error submitting your application. Please try again or contact us.",
      );
    } finally {
      setLoading(false);
    }
  };
  if (!APPLICATIONS_OPEN) {
    return (
      <CenteredCard>
        <h1 className="mb-3 font-helvetica text-2xl font-bold">
          Applications are closed
        </h1>
        <p className="mb-4 text-sm">
          Thanks for your interest in BostonHacks! Applications for this year
          are now closed. If you already applied, you can check your status
          below.
        </p>
        <Link href="/apply/status" className={buttonClass}>
          Check my status
        </Link>
      </CenteredCard>
    );
  }
  if (pageLoading) {
    return (
      <CenteredCard>
        <p className="font-helvetica font-bold">Loading…</p>
      </CenteredCard>
    );
  }

  if (alreadySubmitted) {
    return (
      <CenteredCard>
        <h1 className="mb-3 font-helvetica text-2xl font-bold">
          Already submitted
        </h1>
        <p className="text-sm">
          You&apos;ve already submitted an application for this year. If you
          believe this is an error, contact us at{" "}
          <a className="underline" href="mailto:contact@bostonhacks.org">
            contact@bostonhacks.org
          </a>
          .
        </p>
      </CenteredCard>
    );
  }

  if (submissionSuccess) {
    return (
      <CenteredCard>
        <h1 className="mb-3 font-helvetica text-2xl font-bold text-green-700">
          Application submitted
        </h1>
        <p className="mb-4 text-sm">
          Thanks for applying to BostonHacks! We&apos;ve received your
          application and will review it soon.
        </p>
        <Link href="/" className={buttonClass}>
          Return home
        </Link>
      </CenteredCard>
    );
  }

  if (error) {
    return (
      <CenteredCard>
        <h1 className="mb-3 font-helvetica text-2xl font-bold text-red-700">
          Something went wrong
        </h1>
        <p className="mb-4 text-sm">{error}</p>
        <button className={buttonClass} onClick={() => setError(null)}>
          Try again
        </button>
      </CenteredCard>
    );
  }

  return (
    <section className="relative isolate w-full overflow-hidden bg-white px-6 py-12 font-akshar text-black">
      <GridBackground />
      <div className="relative mx-auto max-w-2xl">
        <h1 className="mb-8 text-center font-helvetica text-3xl font-bold">
          BostonHacks Application
        </h1>

        <form onSubmit={handleSubmit}>
          <fieldset className={fieldsetClass}>
            <legend className={legendClass}>Personal information</legend>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="firstName">
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="lastName">
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="gender">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={selectClass}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className={labelClass} htmlFor="pronouns">
                  Pronouns
                </label>
                <input
                  id="pronouns"
                  type="text"
                  name="pronouns"
                  value={formData.pronouns}
                  onChange={handleInputChange}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="age">
                  Age
                </label>
                <input
                  id="age"
                  type="number"
                  name="age"
                  min={1}
                  value={formData.age}
                  onChange={handleInputChange}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="ethnicity">
                  Ethnicity
                </label>
                <select
                  id="ethnicity"
                  name="ethnicity"
                  value={formData.ethnicity}
                  onChange={handleInputChange}
                  className={selectClass}
                  required
                >
                  <option value="">Select ethnicity</option>
                  {ETHNICITY_OPTIONS.map((option: string) => (
                    <option
                      key={option}
                      value={option.toLowerCase().replace(/\s+/g, "-")}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass} htmlFor="phoneNumber">
                  Phone number
                </label>
                <input
                  id="phoneNumber"
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  className={inputClass}
                  disabled
                />
              </div>
            </div>
          </fieldset>

          <fieldset className={fieldsetClass}>
            <legend className={legendClass}>Location</legend>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className={labelClass} htmlFor="city">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="state">
                  State
                </label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={selectClass}
                  required
                >
                  <option value="">Select state</option>
                  {STATE_OPTIONS.map((state: string) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass} htmlFor="country">
                  Country
                </label>
                <input
                  id="country"
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className={inputClass}
                  required
                />
              </div>
            </div>
          </fieldset>

          <fieldset className={fieldsetClass}>
            <legend className={legendClass}>Education</legend>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="school">
                  School
                </label>
                <SchoolSelect
                  id="school"
                  value={formData.school}
                  onChange={(school) =>
                    setFormData((prev) => ({ ...prev, school }))
                  }
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="gradYear">
                  Graduation year
                </label>
                <input
                  id="gradYear"
                  type="number"
                  name="gradYear"
                  min={new Date().getFullYear()}
                  max={new Date().getFullYear() + 100}
                  value={formData.gradYear}
                  onChange={handleInputChange}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="educationLevel">
                  Education level
                </label>
                <select
                  id="educationLevel"
                  name="educationLevel"
                  value={formData.educationLevel}
                  onChange={handleInputChange}
                  className={selectClass}
                  required
                >
                  <option value="">Select level</option>
                  <option value="high-school">High school</option>
                  <option value="undergraduate">Undergraduate</option>
                  <option value="graduate">Graduate</option>
                  <option value="phd">PhD</option>
                </select>
              </div>
              <div>
                <label className={labelClass} htmlFor="major">
                  Major
                </label>
                <select
                  id="major"
                  name="major"
                  value={formData.major}
                  onChange={handleInputChange}
                  className={selectClass}
                  required
                >
                  <option value="">Select major</option>
                  {MAJORS_OPTIONS.map((major: string) => (
                    <option key={major} value={major}>
                      {major}
                    </option>
                  ))}
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </fieldset>

          <fieldset className={fieldsetClass}>
            <legend className={legendClass}>Logistics</legend>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="diet">
                  Dietary restrictions
                </label>
                <input
                  id="diet"
                  type="text"
                  name="diet"
                  value={formData.diet}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="None, vegetarian, vegan, etc."
                  required
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="shirtSize">
                  Shirt size
                </label>
                <select
                  id="shirtSize"
                  name="shirtSize"
                  value={formData.shirtSize}
                  onChange={handleInputChange}
                  className={selectClass}
                  required
                >
                  <option value="">Select size</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </div>
              <label className="flex items-center gap-2 sm:col-span-2">
                <input
                  type="checkbox"
                  name="sleep"
                  checked={formData.sleep}
                  onChange={handleInputChange}
                />
                <span className="text-sm">I plan to sleep at the venue</span>
              </label>
            </div>
          </fieldset>

          <fieldset className={fieldsetClass}>
            <legend className={legendClass}>Links (optional)</legend>
            <div className="flex flex-col gap-3">
              <div>
                <label className={labelClass} htmlFor="github">
                  GitHub
                </label>
                <input
                  id="github"
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="https://github.com/username"
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="linkedin">
                  LinkedIn
                </label>
                <input
                  id="linkedin"
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="portfolio">
                  Portfolio
                </label>
                <input
                  id="portfolio"
                  type="url"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="https://yourportfolio.com"
                />
              </div>
            </div>
          </fieldset>

          <fieldset className={fieldsetClass}>
            <legend className={legendClass}>Application materials</legend>
            <div className="flex flex-col gap-4">
              <div>
                <label className={labelClass} htmlFor="whyBostonhacks">
                  Why do you want to attend BostonHacks?
                </label>
                <textarea
                  id="whyBostonhacks"
                  name="whyBostonhacks"
                  value={formData.whyBostonhacks}
                  onChange={handleInputChange}
                  className={`${inputClass} h-24 resize-none`}
                  placeholder="Tell us why you're excited about BostonHacks..."
                  required
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="resume">
                  Resume (PDF, DOC, or DOCX)
                </label>
                <input
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                  className="block w-full text-sm file:mr-3 file:rounded file:border-2 file:border-black file:bg-white file:px-3 file:py-1.5 file:font-helvetica file:font-bold file:hover:bg-black file:hover:text-white"
                />
                {formData.resume && (
                  <p className="mt-1 text-xs text-green-700">
                    Selected: {formData.resume.name}
                  </p>
                )}
              </div>
            </div>
          </fieldset>

          <fieldset className={fieldsetClass}>
            <legend className={legendClass}>Agreement terms</legend>
            <p className="mb-3 text-sm">
              We are currently in the process of partnering with MLH. The
              following checkboxes are for this partnership — if we don&apos;t
              end up partnering with MLH, your information will not be shared.
            </p>
            <div className="flex flex-col gap-3">
              <label className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="mt-1 flex-shrink-0"
                  required
                />
                <span>
                  I have read and agree to the{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                    href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md"
                  >
                    MLH Code of Conduct
                  </a>
                  .
                </span>
              </label>
              <label className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  name="authorizeDataUse"
                  checked={formData.authorizeDataUse}
                  onChange={handleInputChange}
                  className="mt-1 flex-shrink-0"
                  required
                />
                <span>
                  I authorize you to share my application/registration
                  information with Major League Hacking for event
                  administration, ranking, and administration (including the
                  creation of linked accounts on MLH and DEV (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                    href="https://dev.to/"
                  >
                    dev.to
                  </a>
                  )) in line with the{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                    href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md"
                  >
                    MLH Privacy Policy
                  </a>
                  . I further agree to the terms of both the{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                    href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md"
                  >
                    MLH Contest Terms and Conditions
                  </a>{" "}
                  and the{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                    href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md"
                  >
                    MLH Privacy Policy
                  </a>
                  .
                </span>
              </label>
              <label className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  name="authorizeMLHEmail"
                  checked={formData.authorizeMLHEmail}
                  onChange={handleInputChange}
                  className="mt-1 flex-shrink-0"
                />
                <span>
                  (Optional) I authorize MLH + DEV to send me occasional emails
                  about relevant events, career opportunities, and community
                  announcements.
                </span>
              </label>
            </div>
          </fieldset>

          <div className="flex justify-center pt-2">
            <button type="submit" className={buttonClass} disabled={loading}>
              {loading ? "Submitting…" : "Submit application"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
