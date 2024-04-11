import educations from "./educations.json";

export default function Educations() {
  return (
    <div className="xl:p-6 p-4 flex flex-col justify-center items-center">
      <h1 className="text-txt-dark mb-4 text-4xl pb-4 border-b-4 px-4 w-fit border-txt-dark">
        Educations
      </h1>
      <div className="flex flex-col">
        {educations.map((education,index) => {
          const startDate = new Date(education.start_date).toLocaleDateString(
            "en-GB",
            {
              year: "numeric",
            }
          );
          const endDate =
            education.end_date &&
            new Date(education.end_date).toLocaleDateString("en-GB", {
              year: "numeric",
            });
          return (
            <div className="flex flex-col justify-start my-4" key={`education-${index}`}>
              <h2 className=" font-medium text-2xl mb-2 w-fit">
                {education.university}
              </h2>
              <div>
                <span>
                  {startDate} - {endDate ? endDate : <i>Present</i>}
                </span>

                <span className=" border-l-4 ml-4 pl-4 h-100 border-[#3d3d3d]">
                  {education.degree}
                </span>
              </div>
              <div className="mt-4 pl-1 max-w-[700px]">
                <ul className="list-disc">
                  {education.achievements.map((achievement, index) => {
                    return (
                      <li
                        key={`achievement-${index}`}
                        dangerouslySetInnerHTML={{ __html: achievement }}
                      />
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
