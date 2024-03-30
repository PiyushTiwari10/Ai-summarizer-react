import React, { useEffect } from "react";
import { useState } from "react";
import { linkIcon, loader } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";
import { copy } from "../assets";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const onchange = (e) => {
    setArticle({ ...article, url: e.target.value });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];
      setAllArticles(updatedAllArticles);
      setArticle(newArticle);

      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };
  const handleDelete = (indexToDelete) => {
    const updatedArticles = allArticles.filter(
      (_, index) => index !== indexToDelete
    );
    setAllArticles(updatedArticles);
    localStorage.setItem("articles", JSON.stringify(updatedArticles));
  };

  const handleCopy = async (e, url) => {
    e.stopPropagation(); // Prevent click event from propagating to parent elements
  
    try {
      await navigator.clipboard.writeText(url); // Copy URL to clipboard
      alert("URL copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy:", error);
      alert("Failed to copy URL.");
    }
  };
  
  return (
    <section className="flex flex-col justify-center items-center mt-16">
      <div className="w-full max-w-xl">
        <form className="relative flex items-center" onSubmit={HandleSubmit}>
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={onchange}
            required
            className="url_input peer"
          />

          <button
            type="submit"
            className="submit_btn 
          peer-focus:border-gray-700
          peer-focus:text-gray-700
          "
          >
            ↵{" "}
          </button>
        </form>

        <div className="flex flex-col gap-1 mt-1 max-h-60 overflow-y-auto">
          {allArticles.map((items, index) => (
            <div
              className="link_card"
              key={index}
              onClick={() => setArticle(items)}
            >
              <div>
                <img
                  src={copy}
                  className="border border-gray-400 rounded-lg p-1"
                  onClick={(e) => handleCopy(e, items.url)}
                />
              </div>
              <p className="text-blue-700 text-sm pl-2">{items.url}</p>
              <button
                onClick={() => handleDelete(index)} // Call a function to handle deletion
                className="border border-gray-400 rounded-lg px-2"
              >
                ✘
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className=" my-10 max-w-full flex justify-center items-center sm:max-w-2xl ">
        {isFetching ? (
          <img src={loader} />
        ) : error ? (
          <p> Oops,that wasn't supposed to happen</p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3 ">
              <h2 className="font-bold ml-[39%]">
                Article{" "}
                <span className="bg-gradient-to-r from-blue-500 p-2 font-bold rounded-lg">
                  Summary
                </span>
              </h2>

              <div className="summary_box">
                <p>{article.summary}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
