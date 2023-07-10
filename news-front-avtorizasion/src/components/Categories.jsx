import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCategories } from "../features/categoriesSlice"
import styles from './news.module.css'
import { fetchNews, fetchNewsCategorie } from "../features/newsSlice"

const Categories = () => {
    const dispatch = useDispatch()
    const categories = useSelector((state) => state.categories.categories)
    const news = useSelector((state) => state.news.news)
    console.log(news)
    
    useEffect(() => {
        dispatch(fetchCategories())
    },[])

    

    const handleClick = (id) => {
        dispatch(fetchNewsCategorie(id))
    }

    return (
        <div className={styles.categorie}>
            {categories.map((item) => {
                return (
                  <button onClick={() => handleClick(item._id)} className={styles.text}>{item.categoriesName}</button>  
                )
            })}
        </div>
    )
}

export default Categories