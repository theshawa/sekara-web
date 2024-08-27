import { Link } from "react-router-dom";
import { ClapButton } from "../../common/clap-button";
import { useAppContext } from "../../context";
import { formatDate } from "../../utils";

export const ActionBar = ({ createdAt, createdBy, claps, topic, _id }) => {
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
        {formatDate(new Date(createdAt))}
      </span>
      <ClapButton disabled={!auth} count={claps} _id={_id} />
    </div>
  );
};
