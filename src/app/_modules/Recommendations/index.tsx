import recommendations from "./recommendations.json";
export default function Recommendations() {
  return (
    <div className="xl:p-y-6 p-y-4 flex flex-col items-center">
      <h1 className="text-txt-dark text-4xl mb-4 pb-4 border-b-4 px-4 w-fit border-txt-dark">
        Recommendations
      </h1>
      <div className="w-full overflow-x-scroll">
        <ul className="list-disc my-4 flex flex-row gap-5 mx-4">
          {recommendations.map(({ name, title, description }, index) => {
            return (
              <li
                className="list-none flex items-stretch "
                key={`honor-${index}`}
              >
                <div className="mb-4 mr-4 z-50 min-w-[80vw] flex bg-white flex-col items-center justify-center shadow-xl rounded-lg p-8 ">
                  <h2 className="text-xl font-semibold italic text-center">{name}</h2>
                  <caption className="text-xs text-gray-500 italic mt-1">{title}</caption>
                  <blockquote
                    className="italic text-center mt-5"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
