import about from "./about.json";

export default function About() {
  const years_of_experience =
    new Date().getFullYear() - about.years_of_experience_start;

  return (
    <section className="flex justify-center my-4 mx-4">
      <div className="text-justify max-w-[700px] border-[#3d3d3d] border-y-4 py-2 px-2 flex flex-col gap-6">
        {about.description.map((paragraph, index) => (
          <p
            key={index}
            dangerouslySetInnerHTML={{
              __html: paragraph.replace(
                "{years_of_experience}",
                String(years_of_experience)
              ),
            }}
          />
        ))}
      </div>
    </section>
  );
}
