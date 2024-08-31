import { Link } from "react-router-dom";
import { BookmarkButton } from "../../common/bookmark-button";
import { ClapButton } from "../../common/clap-button";
import { useAppContext } from "../../context";
import { formatDate } from "../../utils";

export const ActionBar = ({
  createdAt,
  createdBy,
  claps,
  topic,
  _id,
  bookmarkedBy,
}) => {
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
        to={`/?topic=${topic._id}`}
        className="hover:underline mr-4 capitalize font-semibold"
      >
        #{topic.title}
      </Link>
      <span className="mr-4">
        🕑
        {formatDate(new Date(createdAt))}
      </span>
      <ClapButton
        disabled={!auth || auth._id === createdBy._id}
        count={claps}
        _id={_id}
      />
      <div className="mr-5"></div>
      {auth && <BookmarkButton _id={_id} bookmarkedBy={bookmarkedBy} />}
    </div>
  );
};
