import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../features/newsSlice";
import Categories from "./Categories";
import styles from "./news.module.css";
import { Link } from "react-router-dom";

const News = () => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news);
  
  useEffect(() => {
    dispatch(fetchNews());
  }, []);

  
  return (
    <div>
        
        <Categories />
    
      <div className={styles.content}>
      {news.map((item) => {
        return (
                
          <div>
            <div className={styles.rod}>
              <div>
                <img className={styles.img} src={item.img} alt="" />
                <h2>{item.newsHeader}</h2>
                <p>{item.text}</p>
                {/* <div>{item.categories.categoriesName} </div> */}
                <div className={styles.coment}>

                <Link  to={`/todo/${item._id}`}>Comments</Link>
                </div>

              </div>
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
};

export default News;
