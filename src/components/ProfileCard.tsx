import React from "react";
import "./ProfileCard.scss";
import { GitHubUser } from "../interfaces/interfaces";

type Props = {
  user: GitHubUser | null;
};

const ProfileCard: React.FC<Props> = ({ user }) => {
  if (!user) return null;

  const joinedDate = new Date(user.created_at).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="user">
      <div className="user__header">
        <img
          src={user.avatar_url}
          alt={`${user.name || user.login}'s avatar`}
          className="user__avatar"
        />
        <div className="user__intro">
          <h2>{user.name || user.login}</h2>
          <p>@{user.login}</p>
          <time dateTime={user.created_at}>Joined {joinedDate}</time>
        </div>
      </div>
      <div>{user.bio}</div>

      <div className="user__stats" aria-label="User statistics">
        <div className="user__stat">
          <h3>Repositories</h3>
          <p>{user.public_repos}</p>
        </div>
        <div className="user__stat">
          <h3>Followers</h3>
          <p>{user.followers}</p>
        </div>
        <div className="user__stat">
          <h3>Following</h3>
          <p>{user.following}</p>
        </div>
      </div>

      <address className="user__contact">
        <p>{user.location || "No location provided"}</p>
        {(user.blog && (
          <>
            🔗&nbsp;
            <a
              className="user__link"
              href={user.blog}
              target="_blank"
              rel="noopener noreferrer"
            >
              {user.blog}
            </a>
          </>
        )) ||
          "🔗 Not available"}
      </address>
    </section>
  );
};

export default ProfileCard;
