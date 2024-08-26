import { Link } from "react-router-dom";
import { formatDate } from "../utils";

export const Comment = ({ user, content, updatedAt }) => {
  return (
    <div className="flex flex-col max-w-md w-full">
      <p className="text-slate-500 text-sm">
        <Link to={`/user/${user._id}`} className="hover:underline font-medium">
          {user.firstName} {user.lastName}
        </Link>{" "}
        @ {formatDate(updatedAt)}
      </p>
      <p className="text-slate-900 mt-1">{content}</p>
    </div>
  );
};
