import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { Form, useSearchParams, useSubmit } from "react-router-dom";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [searchParams] = useSearchParams();
  const [topic, setTopic] = useState("");
  useEffect(() => {
    const query = searchParams.get("query");
    const topic = searchParams.get("topic");
    if (query) {
      setQuery(query);
    }
    if (topic) {
      setTopic(topic);
    }
  }, [searchParams]);
  const formRef = useRef();
  const submit = useSubmit();
  return (
    <>
      <Form
        ref={formRef}
        method="get"
        action="/"
        className="h-full flex items-center bg-slate-200/90 backdrop-blur-sm lg:flex-shrink-0 rounded-full w-full"
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          name="query"
          placeholder="Search here..."
          className="h-full pl-5 pr-0 w-[calc(100%-40px)] placeholder:text-slate-500 border-none bg-transparent"
        />
        {topic ? <input type="hidden" name="topic" value={topic} /> : ""}
        {searchParams.get("query")?.trim() && (
          <div
            role="button"
            onClick={(e) => {
              const formData = new FormData(formRef.current);
              formData.delete("query");
              setQuery("");
              submit(formData, { method: "GET", action: "/" });
            }}
            className="rounded-r-full active:scale-90 text-slate-500 w-[40px] h-[40px] flex items-center justify-center"
          >
            <XMarkIcon className="size-4" />
          </div>
        )}
      </Form>
    </>
  );
};
