"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";

// The MLH school list lives at /public/schools.csv (one quoted name per line).
const SCHOOLS_URL = "/schools.csv";
const MAX_RESULTS = 50;

// Turns the raw CSV into a clean, de-duplicated, alphabetized list.
// Handles CSV-escaped quotes ("" -> ") and drops MLH's header note.
export const parseSchoolList = (raw: string): string[] => {
  const names = raw
    .split(/\r?\n/)
    .map((line) => {
      let name = line.trim();
      if (name.length >= 2 && name.startsWith('"') && name.endsWith('"')) {
        name = name.slice(1, -1).replace(/""/g, '"');
      }
      return name.replace(/\s+/g, " ").trim();
    })
    .filter((name) => name && !name.startsWith("Below is a list"));

  return Array.from(new Set(names)).sort((a, b) => a.localeCompare(b));
};

// Fetched once per page load and shared across mounts.
let schoolsPromise: Promise<string[]> | null = null;
const loadSchools = () => {
  if (!schoolsPromise) {
    schoolsPromise = fetch(SCHOOLS_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load schools (${res.status})`);
        return res.text();
      })
      .then(parseSchoolList)
      .catch((err) => {
        schoolsPromise = null; // allow a retry on next mount
        throw err;
      });
  }
  return schoolsPromise;
};

type SchoolSelectProps = {
  id: string;
  value: string;
  onChange: (school: string) => void;
  className?: string;
  required?: boolean;
};

export default function SchoolSelect({
  id,
  value,
  onChange,
  className,
  required,
}: SchoolSelectProps) {
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const [schools, setSchools] = useState<string[] | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    loadSchools()
      .then((list) => {
        if (!cancelled) setSchools(list);
      })
      .catch((err) => {
        console.error("Error loading school list:", err);
        if (!cancelled) setLoadFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const indexed = useMemo(
    () => (schools ?? []).map((name) => ({ name, lower: name.toLowerCase() })),
    [schools],
  );

  // Every word typed must appear in the name; names that start with the
  // query are ranked first. "mass amherst" finds UMass Amherst.
  const allMatches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return indexed.map((s) => s.name);
    const tokens = q.split(/\s+/);
    const starts: string[] = [];
    const rest: string[] = [];
    for (const s of indexed) {
      if (!tokens.every((t) => s.lower.includes(t))) continue;
      (s.lower.startsWith(q) ? starts : rest).push(s.name);
    }
    return [...starts, ...rest];
  }, [indexed, query]);

  const matches = allMatches.slice(0, MAX_RESULTS);

  // Native form validation: block submit unless a school was picked from
  // the list. If the list failed to load, fall back to free text so
  // applicants aren't locked out.
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.setCustomValidity(
      !loadFailed && !value ? "Please choose your school from the list." : "",
    );
  }, [value, loadFailed]);

  useEffect(() => {
    if (!open) return;
    const option = listRef.current?.querySelector<HTMLElement>(
      `[data-index="${activeIndex}"]`,
    );
    option?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  const select = (school: string) => {
    onChange(school);
    setQuery(school);
    setOpen(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setQuery(text);
    setOpen(true);
    setActiveIndex(0);

    if (loadFailed) {
      onChange(text);
      return;
    }
    // Typing an exact name (any case) counts as choosing it.
    const exact = schools?.find(
      (s) => s.toLowerCase() === text.trim().toLowerCase(),
    );
    onChange(exact ?? "");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (loadFailed) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) setOpen(true);
        else setActiveIndex((i) => Math.min(i + 1, matches.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
        if (open && matches[activeIndex]) {
          e.preventDefault(); // pick the school instead of submitting the form
          select(matches[activeIndex]);
        }
        break;
      case "Escape":
        setOpen(false);
        break;
    }
  };

  const showList = open && !loadFailed;

  return (
    <div className="relative">
      <input
        ref={inputRef}
        id={id}
        type="text"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={showList}
        aria-controls={listId}
        aria-activedescendant={
          showList && matches[activeIndex]
            ? `${listId}-${activeIndex}`
            : undefined
        }
        autoComplete="off"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        placeholder={
          loadFailed ? "Type your school's full name" : "Start typing to search"
        }
        className={className}
        required={required}
      />

      {showList && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          className="absolute z-20 mt-1 max-h-64 w-full overflow-y-auto rounded border-2 border-black/20 bg-white font-akshar text-sm shadow-lg"
        >
          {!schools ? (
            <li className="px-3 py-2 text-black/60">Loading schools…</li>
          ) : matches.length === 0 ? (
            <li className="px-3 py-2 text-black/60">No matching schools</li>
          ) : (
            matches.map((school, i) => (
              <li
                key={school}
                id={`${listId}-${i}`}
                data-index={i}
                role="option"
                aria-selected={i === activeIndex}
                // keep focus in the input so the click registers
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => select(school)}
                onMouseEnter={() => setActiveIndex(i)}
                className={`cursor-pointer px-3 py-2 ${
                  i === activeIndex ? "bg-black text-white" : ""
                }`}
              >
                {school}
              </li>
            ))
          )}
          {schools && allMatches.length > MAX_RESULTS && (
            <li className="px-3 py-2 text-xs text-black/50">
              Showing {MAX_RESULTS} of {allMatches.length.toLocaleString()} —
              keep typing to narrow it down
            </li>
          )}
        </ul>
      )}

      {loadFailed && (
        <p className="mt-1 text-xs text-black/60">
          Couldn&apos;t load the school list — type your school&apos;s full
          name instead.
        </p>
      )}
    </div>
  );
}
