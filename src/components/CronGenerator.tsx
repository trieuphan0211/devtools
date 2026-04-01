import { useState, useMemo } from "react";
import { Clock, Calendar, CalendarDays, Copy, Check, ChevronDown } from "lucide-react";
import AdPlaceholder from "./AdPlaceholder";

const MINUTES = ["*", ...Array.from({ length: 60 }, (_, i) => String(i))];
const HOURS = ["*", ...Array.from({ length: 24 }, (_, i) => String(i))];
const DAYS = ["*", ...Array.from({ length: 31 }, (_, i) => String(i + 1))];
const MONTHS_MAP: Record<string, string> = { "*": "Every month", "1": "January", "2": "February", "3": "March", "4": "April", "5": "May", "6": "June", "7": "July", "8": "August", "9": "September", "10": "October", "11": "November", "12": "December" };
const MONTHS = Object.keys(MONTHS_MAP);
const WEEKDAYS_MAP: Record<string, string> = { "*": "Every day", "0": "Sunday", "1": "Monday", "2": "Tuesday", "3": "Wednesday", "4": "Thursday", "5": "Friday", "6": "Saturday" };
const WEEKDAYS = Object.keys(WEEKDAYS_MAP);

function toHumanReadable(min: string, hour: string, day: string, month: string, weekday: string): string {
  let time = "";
  if (hour === "*" && min === "*") time = "Every minute";
  else if (hour === "*") time = `At minute ${min} of every hour`;
  else if (min === "*") time = `Every minute during hour ${hour}`;
  else {
    const h = parseInt(hour);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    time = `At ${h12}:${min.padStart(2, "0")} ${ampm}`;
  }

  if (day !== "*") time += `, on day ${day}`;
  if (month !== "*") time += ` of ${MONTHS_MAP[month]}`;
  if (weekday !== "*") time += `, on ${WEEKDAYS_MAP[weekday]}`;
  if (day === "*" && month === "*" && weekday === "*") time += ", every day";

  return time;
}

function getNextRuns(min: string, hour: string, day: string, month: string, weekday: string, count = 5): Date[] {
  const runs: Date[] = [];
  const now = new Date();
  const cursor = new Date(now);
  cursor.setSeconds(0);
  cursor.setMilliseconds(0);
  cursor.setMinutes(cursor.getMinutes() + 1);

  for (let i = 0; i < 525600 && runs.length < count; i++) {
    const m = cursor.getMinutes(), h = cursor.getHours(), d = cursor.getDate(), mo = cursor.getMonth() + 1, wd = cursor.getDay();
    const matchMin = min === "*" || parseInt(min) === m;
    const matchHour = hour === "*" || parseInt(hour) === h;
    const matchDay = day === "*" || parseInt(day) === d;
    const matchMonth = month === "*" || parseInt(month) === mo;
    const matchWeekday = weekday === "*" || parseInt(weekday) === wd;
    if (matchMin && matchHour && matchDay && matchMonth && matchWeekday) {
      runs.push(new Date(cursor));
    }
    cursor.setMinutes(cursor.getMinutes() + 1);
  }
  return runs;
}

const SelectField = ({ label, icon: Icon, value, onChange, options, displayMap }: {
  label: string; icon: React.ElementType; value: string; onChange: (v: string) => void;
  options: string[]; displayMap?: Record<string, string>;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
      <Icon className="h-3 w-3" /> {label}
    </label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-lg border bg-editor text-card-foreground px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/40 pr-8 cursor-pointer"
      >
        {options.map((o) => (
          <option key={o} value={o}>{displayMap ? displayMap[o] : (o === "*" ? `Every ${label.toLowerCase()}` : o)}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
    </div>
  </div>
);

const CronGenerator = () => {
  const [min, setMin] = useState("0");
  const [hour, setHour] = useState("12");
  const [day, setDay] = useState("*");
  const [month, setMonth] = useState("*");
  const [weekday, setWeekday] = useState("1");
  const [copied, setCopied] = useState(false);

  const expression = `${min} ${hour} ${day} ${month} ${weekday}`;
  const readable = useMemo(() => toHumanReadable(min, hour, day, month, weekday), [min, hour, day, month, weekday]);
  const nextRuns = useMemo(() => getNextRuns(min, hour, day, month, weekday), [min, hour, day, month, weekday]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(expression);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-auto">
      {/* Mobile ad top */}
      <div className="flex justify-center py-3 px-4">
        <AdPlaceholder width={320} height={50} className="sm:hidden" />
        <AdPlaceholder width={728} height={90} className="hidden sm:flex" />
      </div>

      <div className="flex-1 flex items-start justify-center px-4 pb-6">
        <div className="w-full max-w-2xl">
          {/* Main Card */}
          <div className="rounded-2xl border bg-card shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b bg-toolbar/50">
              <h2 className="text-base font-semibold text-card-foreground flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" /> Cron Expression Generator
              </h2>
            </div>

            <div className="p-6 space-y-6">
              {/* 5 fields */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <SelectField label="Minute" icon={Clock} value={min} onChange={setMin} options={MINUTES} />
                <SelectField label="Hour" icon={Clock} value={hour} onChange={setHour} options={HOURS} />
                <SelectField label="Day" icon={Calendar} value={day} onChange={setDay} options={DAYS} />
                <SelectField label="Month" icon={CalendarDays} value={month} onChange={setMonth} options={MONTHS} displayMap={MONTHS_MAP} />
                <SelectField label="Weekday" icon={CalendarDays} value={weekday} onChange={setWeekday} options={WEEKDAYS} displayMap={WEEKDAYS_MAP} />
              </div>

              {/* Expression display */}
              <div className="flex items-center justify-between gap-3 rounded-xl bg-primary/5 border border-primary/20 px-5 py-4">
                <code className="text-xl sm:text-2xl font-bold font-mono text-primary tracking-wider">{expression}</code>
                <button onClick={handleCopy} className="p-2 rounded-lg hover:bg-primary/10 transition-colors text-primary" aria-label="Copy">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>

              {/* Human-readable */}
              <p className="text-center text-lg font-semibold text-card-foreground">{readable}</p>

              {/* Next 5 runs */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Next 5 Scheduled Runs</h3>
                <ul className="space-y-1.5">
                  {nextRuns.length > 0 ? nextRuns.map((d, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm font-mono text-card-foreground bg-toolbar/50 rounded-lg px-3 py-2">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      {d.toLocaleString(undefined, { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </li>
                  )) : (
                    <li className="text-sm text-muted-foreground italic">No upcoming runs found within the next year.</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom ad */}
      <div className="flex justify-center py-4 px-4 border-t bg-toolbar/30">
        <AdPlaceholder width={728} height={90} />
      </div>
    </div>
  );
};

export default CronGenerator;
