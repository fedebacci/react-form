import { useState } from "react"
import articles from "../../assets/js/data/data"

export default function Main () {
    const [articlesStateValue, addNewArticle] = useState([...articles]);
    const [newArticleTitle, setNewArticleTitle] = useState("");

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // * TMP CREAZIONE AL VOLO DI UN NUOVO ID PER L'ARTICOLO
        let maximumId = 0;
        for (const article of articlesStateValue) if (article.id > maximumId) maximumId = article.id;
        
        addNewArticle([...articlesStateValue, {
            id: maximumId + 1,
            title: newArticleTitle
        }]);
        setNewArticleTitle("");
    };

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
                                <li className="list-group-item" key={article.id}>
                                    {article.title}
                                </li>
                            );
                        })
                    }
                </ul>

            </div>


        </main>
    );
}