import { Link } from "react-router-dom";
import { useAppContext } from "../../../context";
import { formatDate } from "../../../utils";
import { ClapBtn } from "./clap-btn";

export const ActionBar = ({ updatedAt, createdBy, claps, topic, _id }) => {
  const { auth } = useAppContext();

  return (
    <div className="flex mt-10 items-center flex-wrap text-slate-500 font-medium text-sm">
      <span className="mr-4">
        ✍️{" "}
        <Link to={`/user/${createdBy._id}`} className="hover:underline">
          {createdBy.firstName} {createdBy.lastName}
        </Link>
      </span>
      <Link
        to={`/articles?topic=${topic._id}`}
        className="hover:underline mr-4 capitalize font-semibold"
      >
        #{topic.title}
      </Link>
      <span className="mr-4">
        🕑
        {formatDate(new Date(updatedAt))}
      </span>
      {auth && <ClapBtn count={claps} _id={_id} />}
    </div>
  );
};
