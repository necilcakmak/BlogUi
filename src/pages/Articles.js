import alertify from "alertifyjs";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { get } from "../api/globalServices";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const articles = async () => {
      const response = await get("article/getlist");
      if (response.success) {
        setArticles(response.data);
      } else {
        alertify.error(response.message);
      }
    };
    articles();
  }, []);
  return (
    <div className="container p-3">
      <h5 className="float-left p-2">Article List</h5>

      {articles?.map((a) => (
        <div className="card" key={a.id}>
          <div className="card-body">
            <h5 className="card-title">{a.title}</h5>
            <p className="card-text">{a.content}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Author:{a.user.userName}</li>
            <li className="list-group-item">Category:{a.category.name}</li>
          </ul>
          <div className="card-body">
            <Link className="btn btn-success" to={"/article/" + a.id}>
              Detail
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Articles;
