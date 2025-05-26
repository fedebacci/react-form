import { useState } from "react"
import articles from "../../assets/js/data/data"
import ArticleElement from "../ui/ArticleElement"

export default function Main () {
    const [articlesStateValue, setArticles] = useState([...articles]);
    const [newArticleTitle, setNewArticleTitle] = useState("");

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // * TMP CREAZIONE AL VOLO DI UN NUOVO ID PER L'ARTICOLO
        let maximumId = 0;
        for (const article of articlesStateValue) if (article.id > maximumId) maximumId = article.id;
        
        setArticles([...articlesStateValue, {
            id: maximumId + 1,
            title: newArticleTitle
        }]);
        setNewArticleTitle("");
    };

    const deleteArticle = (id) => {
        console.info(`Cancello articolo: ${id}`);
        console.info(typeof(id));

        const articleToDelete = articlesStateValue.find(article => article.id === parseInt(id));
        const newArticlesStateValue = [...articlesStateValue]
        newArticlesStateValue.splice(newArticlesStateValue.indexOf(articleToDelete), 1);
        setArticles(newArticlesStateValue);
    }

    return (
        <main className="py-5">

            <div className="container">
                <form onSubmit={(e) => handleFormSubmit(e)}>
                    <div className="input-group mb-3">
                        <input 
                        onChange={(e) => setNewArticleTitle(e.target.value)}
                        value={newArticleTitle}

                        type="text" 
                        className="form-control" 
                        placeholder="Submit a new article title" 
                        aria-label="Submit a new article title" 
                        aria-describedby="submitNewArticle" />
                        <button 
                        onClick={(e) => handleFormSubmit(e)}

                        className="btn btn-primary" 
                        type="submit" 
                        id="submitNewArticle">
                            Button
                        </button>
                    </div>
                </form>






                <ul className="list-group">
                    {
                        articlesStateValue.map(article => {
                            return (


                                <li key={article.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    {article.title}
                                    <button onClick={(e) => deleteArticle(e.target.dataset.id)} className="btn btn-danger" data-id={article.id}>
                                        X
                                    </button>
                                </li>




                                // <ArticleElement key={article.id} article={article}>
                                //     {/* <p className="mb-0"><strong>{article.title}</strong> ({article.id})</p> */}
                                // </ArticleElement>
                            );
                        })
                    }
                </ul>

            </div>


        </main>
    );
}