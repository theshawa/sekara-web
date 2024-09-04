import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, apiWithAuth } from "../../../api";
import { LoadingSpinner } from "../../../common/loading-spinner";
import { useHandleApiError } from "../../../hooks/useHandleApiError";
import { useOnlyForAdmin } from "../../../hooks/useOnlyForAdmin";

export const Topic = ({ topic, refresh }) => {
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState(0);
  const handleError = useHandleApiError();

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/articles?topic=${topic._id}`);
        setArticles(data.totalCount);
      } catch (error) {
        handleError(error, "load articles");
      } finally {
        setLoading(false);
      }
    };
    loadArticles();
  }, []);
  const editTopic = async () => {
    setEditing(true);
    try {
      const title = prompt(
        `Enter the new title of the new topic #${
          topic.title.charAt(0).toUpperCase() + topic.title.slice(1)
        }`,
        topic.title
      );
      if (!title) {
        alert("Please enter a valid title");
        setEditing(false);
        return;
      }
      await apiWithAuth().put(`/topics/${topic._id}`, { title });
      refresh();
    } catch (error) {
      handleError(error, "update topic");
    } finally {
      setEditing(false);
    }
  };

  const deleteTopic = async () => {
    setDeleting(true);
    try {
      const yes = confirm("Are you sure you want to delete this topic?");
      if (!yes) {
        setEditing(false);
        return;
      }
      await apiWithAuth().delete(`/topics/${topic._id}`);
      refresh();
    } catch (error) {
      handleError(error, "delete topic");
    } finally {
      setDeleting(false);
    }
  };
  return (
    <div className="flex flex-col">
      <Link to={`/app?topic=${topic._id}`}>
        <h2 className="capitalize hover:underline"># {topic.title}</h2>
      </Link>
      <p>{loading ? "..." : `${articles} Article(s)`}</p>
      <div className="flex mt-3">
        <button
          onClick={editTopic}
          disabled={editing}
          className="action-btn mr-2"
        >
          {editing ? "Editing..." : "Edit"}
        </button>
        <button
          onClick={deleteTopic}
          disabled={deleting}
          className="action-btn"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export const AdminTopicsPage = () => {
  useOnlyForAdmin();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const handleError = useHandleApiError();

  const loadTopics = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/topics");
      setTopics(data);
    } catch (error) {
      handleError(error, "load topics");
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  useEffect(() => {
    loadTopics();
    // const interval = setInterval(loadTopics, 60 * 1000);
    // return () => clearInterval(interval);
  }, [loadTopics]);

  const addTopic = async () => {
    setAdding(true);
    try {
      const title = prompt("Enter the title of the new topic");
      if (!title) {
        alert("Please enter a valid title");
        setAdding(false);
        return;
      }
      await apiWithAuth().post("/topics/create", { title });
      loadTopics();
    } catch (error) {
      handleError(error, "add topic");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="flex flex-col mt-10">
      <h1 className="mb-5">Manage Topics</h1>
      <div className="flex mb-10 space-x-5 items-center">
        <button
          onClick={addTopic}
          className="btn w-max max-w-full"
          disabled={adding}
        >
          {adding ? "Adding..." : "Add New Topic"}
        </button>
        <button className="action-btn" disabled={loading} onClick={loadTopics}>
          Refresh
        </button>
      </div>
      {loading && (
        <div className="mx-auto">
          <LoadingSpinner />
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-10 pb-10">
        {topics.map((topic, i) => (
          <Topic key={i} topic={topic} refresh={loadTopics} />
        ))}
      </div>
    </div>
  );
};
