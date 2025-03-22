import skills from "./skills.json";

export default function Skills() {
  return (
    <section className="xl:p-6 lg:px-12 xl:px-12 p-4 flex flex-col items-center">
      <h1 className="text-txt-dark text-4xl mb-4 pb-4 border-b-4 px-4 w-fit border-txt-dark">
        Skills
      </h1>
      <div className="flex flex-col gap-0">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="mb-0 w-full">
            <h3 className="text-lg font-semibold mb-0 text-center">{category}</h3>
            <ul className="list-disc grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 grid-flow-row gap-y-2 gap-x-16 my-4">
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
