import { Check, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "leetcore_tomorrow_todos";

function TomorrowTodo() {
    const [todos, setTodos] = useState(() => {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
            return Array.isArray(saved) ? saved : [];
        } catch (err) {
            console.error("Failed to load tomorrow todos:", err);
            return [];
        }
    });
    const [task, setTask] = useState("");

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);

    const addTodo = () => {
        const text = task.trim();
        if (!text) return;

        setTodos((current) => [
            { id: crypto.randomUUID?.() || `${Date.now()}-${text}`, text, done: false },
            ...current,
        ]);
        setTask("");
    };

    const toggleTodo = (id) => {
        setTodos((current) =>
            current.map((todo) =>
                todo.id === id ? { ...todo, done: !todo.done } : todo
            )
        );
    };

    const removeTodo = (id) => {
        setTodos((current) => current.filter((todo) => todo.id !== id));
    };

    return (
        <section className="w-[94%] mx-auto rounded-3xl border border-white/10 bg-[#111113] p-5 shadow-[0_16px_45px_rgba(0,0,0,0.18)]">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">
                        Next Day
                    </p>
                    <h2 className="mt-1 text-sm font-semibold text-white">
                        To-Do List
                    </h2>
                </div>
                <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-medium text-white/45">
                    {todos.length} tasks
                </span>
            </div>

            <div className="mt-4 flex gap-2">
                <input
                    value={task}
                    onChange={(event) => setTask(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") addTodo();
                    }}
                    placeholder="Plan tomorrow"
                    className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none placeholder:text-white/30 focus:border-orange-400/60"
                />
                <button
                    type="button"
                    onClick={addTodo}
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-orange-400 text-black transition active:scale-95 cursor-pointer"
                    aria-label="Add to-do"
                    title="Add to-do"
                >
                    <Plus size={18} />
                </button>
            </div>

            <div className="mt-4 space-y-2">
                {todos.length === 0 ? (
                    <p className="rounded-2xl border border-dashed border-white/10 px-3 py-4 text-center text-xs text-white/35">
                        Add your first task for tomorrow.
                    </p>
                ) : (
                    todos.slice(0, 4).map((todo) => (
                        <div
                            key={todo.id}
                            className="flex items-center gap-2 rounded-2xl border border-white/5 bg-white/[0.03] px-3 py-2"
                        >
                            <button
                                type="button"
                                onClick={() => toggleTodo(todo.id)}
                                className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border transition cursor-pointer ${todo.done
                                    ? "border-orange-400 bg-orange-400 text-black"
                                    : "border-white/15 text-transparent hover:border-white/30"
                                    }`}
                                aria-label={todo.done ? "Mark task pending" : "Mark task done"}
                                title={todo.done ? "Mark pending" : "Mark done"}
                            >
                                <Check size={14} />
                            </button>
                            <span className={`min-w-0 flex-1 truncate text-sm ${todo.done ? "text-white/35 line-through" : "text-white/75"}`}>
                                {todo.text}
                            </span>
                            <button
                                type="button"
                                onClick={() => removeTodo(todo.id)}
                                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-xl text-white/30 transition hover:bg-white/5 hover:text-white/70 cursor-pointer"
                                aria-label="Delete to-do"
                                title="Delete"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}

export default TomorrowTodo;
