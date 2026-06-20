function CodeBlock({ code }) {
    return (
        <pre className="mt-3 overflow-x-auto rounded-xl border border-white/10 bg-black/35 p-4 text-sm leading-6 text-orange-100">
            <code>{code}</code>
        </pre>
    );
}

function Section({ section }) {
    return (
        <section id={section.id} className="scroll-mt-6 border-b border-white/8 py-7 last:border-b-0">
            <h2 className="text-2xl font-bold text-white">{section.title}</h2>

            {section.type === "paragraph" && (
                <div className="mt-4 space-y-3 text-sm leading-7 text-white/70">
                    {section.content.map((text) => (
                        <p key={text}>{text}</p>
                    ))}
                </div>
            )}

            {section.type === "callout" && (
                <p className="mt-4 rounded-xl border border-orange-300/20 bg-orange-500/10 p-4 text-sm font-medium leading-7 text-orange-100">
                    {section.content}
                </p>
            )}

            {section.type === "example" && (
                <div className="mt-4 space-y-3 text-sm leading-7 text-white/70">
                    {section.content.map((text) => (
                        <p key={text}>{text}</p>
                    ))}
                    <CodeBlock code={section.diagram} />
                </div>
            )}

            {section.type === "list" && (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-white/70">
                    {section.items.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            )}

            {section.type === "visualization" && (
                <div className="mt-4">
                    <h3 className="text-sm font-semibold text-white">Diagram</h3>
                    <CodeBlock code={section.diagram} />
                    <h3 className="mt-5 text-sm font-semibold text-white">Interactive Visualization Code</h3>
                    <CodeBlock code={section.code} />
                </div>
            )}

            {section.type === "internal" && (
                <div className="mt-4 space-y-4 text-sm leading-7 text-white/70">
                    {section.content.map((text) => (
                        <p key={text}>{text}</p>
                    ))}
                    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                        <p className="font-semibold text-white">{section.structure}</p>
                        <ul className="mt-3 space-y-2">
                            {section.memory.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {section.type === "operations" && (
                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                    {section.items.map((item) => (
                        <article key={item.name} className="rounded-xl border border-white/10 bg-black/20 p-4">
                            <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                            <p className="mt-2 text-sm text-orange-200">STL: {item.stl}</p>
                            <p className="mt-2 text-sm text-white/65">Visualization: {item.visual}</p>
                            <CodeBlock code={item.code} />
                        </article>
                    ))}
                </div>
            )}

            {section.type === "syntax" && (
                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                    {section.snippets.map((snippet) => (
                        <article key={snippet.label} className="rounded-xl border border-white/10 bg-black/20 p-4">
                            <h3 className="text-sm font-semibold text-white">{snippet.label}</h3>
                            <CodeBlock code={snippet.code} />
                        </article>
                    ))}
                </div>
            )}

            {section.type === "complexity" && (
                <div className="mt-4 overflow-x-auto rounded-xl border border-white/10">
                    <table className="w-full min-w-[620px] text-left text-sm">
                        <thead className="bg-white/8 text-white">
                            <tr>
                                <th className="px-4 py-3">Operation</th>
                                <th className="px-4 py-3">Time Complexity</th>
                                <th className="px-4 py-3">Space Complexity</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/8 text-white/70">
                            {section.rows.map((row) => (
                                <tr key={row.operation}>
                                    <td className="px-4 py-3">{row.operation}</td>
                                    <td className="px-4 py-3">{row.time}</td>
                                    <td className="px-4 py-3">{row.space}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {section.type === "mistakes" && (
                <div className="mt-4 space-y-5">
                    {section.items.map((item) => (
                        <article key={item.title} className="rounded-xl border border-white/10 bg-black/20 p-4">
                            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                            <p className="mt-3 text-sm font-semibold text-red-200">Wrong Approach</p>
                            <CodeBlock code={item.wrong} />
                            <p className="mt-3 text-sm font-semibold text-green-200">Correct Approach</p>
                            <CodeBlock code={item.correct} />
                            <p className="mt-3 text-sm leading-6 text-white/65">Why Wrong? {item.why}</p>
                        </article>
                    ))}
                </div>
            )}

            {section.type === "questions" && (
                <div className="mt-4 space-y-6">
                    <p className="text-sm text-white/70">Total Questions: {section.total}</p>
                    {section.categories.map((category) => (
                        <div key={category.name} className="overflow-x-auto rounded-xl border border-white/10">
                            <h3 className="bg-white/8 px-4 py-3 text-lg font-semibold text-white">
                                {category.name} - {category.questions.length} Questions
                            </h3>
                            <table className="w-full min-w-[780px] text-left text-sm">
                                <thead className="bg-black/20 text-white">
                                    <tr>
                                        <th className="px-4 py-3">Problem Name</th>
                                        <th className="px-4 py-3">Platform</th>
                                        <th className="px-4 py-3">Difficulty</th>
                                        <th className="px-4 py-3">Pattern Used</th>
                                        <th className="px-4 py-3">Link</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/8 text-white/70">
                                    {category.questions.map((question) => (
                                        <tr key={`${category.name}-${question.name}`}>
                                            <td className="px-4 py-3">{question.name}</td>
                                            <td className="px-4 py-3">{question.platform}</td>
                                            <td className="px-4 py-3">{question.difficulty}</td>
                                            <td className="px-4 py-3">{question.pattern}</td>
                                            <td className="px-4 py-3">
                                                <a className="text-orange-300 hover:text-orange-200" href={question.link} target="_blank" rel="noreferrer">
                                                    Open
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            )}

            {section.type === "roadmap" && (
                <div className="mt-4 grid gap-4 lg:grid-cols-3">
                    {section.groups.map((group) => (
                        <article key={group.level} className="rounded-xl border border-white/10 bg-black/20 p-4">
                            <h3 className="text-lg font-semibold text-white">
                                {group.level} ({group.count} Questions)
                            </h3>
                            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-white/70">
                                {group.questions.map((question) => (
                                    <li key={`${group.level}-${question}`}>{question}</li>
                                ))}
                            </ol>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}

function DocsContent({ doc }) {
    if (!doc) {
        return (
            <div className="p-6">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
                    <p className="text-sm font-medium text-orange-300">Documentation not found</p>
                    <h1 className="mt-3 text-2xl font-bold text-white">Is topic ke docs abhi add nahi hue hain.</h1>
                    <p className="mt-2 text-sm leading-6 text-white/60">
                        Is topic ke liye JSON documentation add karte hi ye page automatically render ho jayega.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <article className="mx-auto max-w-6xl px-5 py-6 sm:px-7">
            <p className="text-sm font-medium text-orange-300">DSA / Docs / {doc.topic}</p>
            <h1 className="mt-3 text-3xl font-bold text-white">{doc.title}</h1>
            <div className="mt-5 rounded-2xl border border-white/8 bg-[#111113]/75 px-5 sm:px-6">
                {doc.sections.map((section) => (
                    <Section key={section.id} section={section} />
                ))}
            </div>
        </article>
    );
}

export default DocsContent;
