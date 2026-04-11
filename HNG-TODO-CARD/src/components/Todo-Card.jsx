import { useEffect, useState } from "react";

export function TodoCard() {
  const [completed, setCompleted] = useState(false);
  const [status, setStatus] = useState("Pending");
  const [timeRemaining, setTimeRemaining] = useState("");

  const dueDate = new Date("2026-04-16T18:00:00Z");

  const updateTime = () => {
    const now = new Date();
    const diff = dueDate - now;

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    let text = "";

    if (diff < 0) {
      text = `Overdue by ${Math.abs(days)} day(s)`;
    } else if (days > 1) {
      text = `Due in ${days} days`;
    } else if (days === 1) {
      text = "Due tomorrow";
    } else if (hours > 0) {
      text = `Due in ${hours} hours`;
    } else if (minutes > 0) {
      text = `Due in ${minutes} minutes`;
    } else {
      text = "Due now!";
    }

    setTimeRemaining(text);
  };

  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleToggle = () => {
    setCompleted(!completed);
    setStatus(!completed ? "Done" : "Pending");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-blue-50 to-gray-100 p-6">
      <article
        data-testid="test-todo-card"
        className="w-full max-w-md bg-white/80 backdrop-blur-lg border border-gray-200 shadow-xl rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
      >
        {/* HEADER */}
        <div className="flex justify-between items-start">
          <h3
            data-testid="test-todo-title"
            className={`text-xl font-bold tracking-tight text-gray-800 ${
              completed ? "line-through opacity-50" : ""
            }`}
          >
            Finish Frontend Task
          </h3>

          <span
            data-testid="test-todo-priority"
            className="text-xs font-semibold px-3 py-1 rounded-full bg-red-100 text-red-600 shadow-sm"
            aria-label="High priority"
          >
            High
          </span>
        </div>

        {/* DESCRIPTION */}
        <p
          data-testid="test-todo-description"
          className="mt-3 text-sm text-gray-600 leading-relaxed"
        >
          Build a responsive and accessible todo card component with clean UI,
          good structure, and proper test coverage.
        </p>

        {/* DUE DATE */}
        <time
          data-testid="test-todo-due-date"
          dateTime="2026-04-16T18:00:00Z"
          className="block mt-4 text-sm text-gray-500"
        >
          📅 Due April 16, 2026
        </time>

        {/* TIME REMAINING */}
        <span
          data-testid="test-todo-time-remaining"
          aria-live="polite"
          className="block mt-1 text-sm font-medium text-blue-600"
        >
          ⏳ {timeRemaining}
        </span>

        {/* STATUS */}
        <div className="mt-3 text-sm font-semibold">
          Status:{" "}
          <span
            data-testid="test-todo-status"
            className={
              status === "Done"
                ? "text-green-600 font-bold"
                : "text-gray-500"
            }
          >
            {status}
          </span>
        </div>

        {/* CHECKBOX */}
        <label className="flex items-center gap-2 mt-4 cursor-pointer select-none">
          <input
            type="checkbox"
            data-testid="test-todo-complete-toggle"
            checked={completed}
            onChange={handleToggle}
            className="w-4 h-4 accent-blue-600 cursor-pointer"
          />
          <span className="text-sm text-gray-700">Mark as completed</span>
        </label>

        {/* TAGS */}
        <ul role="list"
          data-testid="test-todo-tags"
          className=" gap-4 mt-4 "
        >
          <li
            data-testid="test-todo-tag-work"
            className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 "
          >
            work
          </li>
          <li
            data-testid="test-todo-tag-urgent"
            className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 "
          >
            urgent
          </li>
          <li className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 ">
            design
          </li>
        </ul>

        {/* ACTIONS */}
        <div className="flex justify-between mt-6">
          <button
            data-testid="test-todo-edit-button"
            onClick={() => console.log("edit clicked")}
            className="px-4 py-2 text-sm rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
          >
            ✏️ Edit
          </button>

          <button
            data-testid="test-todo-delete-button"
            onClick={() => alert("Delete clicked")}
            className="px-4 py-2 text-sm rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
          >
            🗑 Delete
          </button>
        </div>
      </article>
    </div>
  );
}