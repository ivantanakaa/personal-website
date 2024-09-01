import honors from "./honors.json";
export default function Honors() {
  return (
    <div className="xl:p-6 lg:px-12 xl:px-12 p-4 flex flex-col items-center mx-4">
      <h1 className="text-txt-dark text-4xl mb-4 pb-4 border-b-4 px-4 w-fit border-txt-dark">
        Honors
      </h1>
      <ul className="list-disc my-4">
        {honors.map((data, index) => {
          return (
            <li
              className="mb-4"
              key={`honor-${index}`}
              dangerouslySetInnerHTML={{ __html: data }}
            />
          );
        })}
      </ul>
    </div>
  );
}
