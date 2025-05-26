import { useState } from "react"
import articles from "../../assets/js/data/data"

export default function Main () {
    const [articlesStateValue, setArticles] = useState([...articles]);
    const [newArticleTitle, setNewArticleTitle] = useState("");
    const [modifiedArticleTitle, setModifiedArticleTitle] = useState("");

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (newArticleTitle.length === 0) return alert('Il titolo deve avere almeno un carattere');

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
        // console.info(`Cancello articolo: ${id}`);
        // console.info(typeof(id));

        const articleToDelete = articlesStateValue.find(article => article.id === parseInt(id));
        const newArticlesStateValue = [...articlesStateValue];
        newArticlesStateValue.splice(newArticlesStateValue.indexOf(articleToDelete), 1);
        setArticles(newArticlesStateValue);
    }


    const showModifyArticle = (id) => {
        // console.info(`Modifico articolo: ${id}`);
        // console.info(typeof(id));

        const modifyArticleTitleEl = document.getElementById('articleTitleModifier');
        modifyArticleTitleEl.classList.remove('d-none');

        const modifyArticleTitleBtn = document.getElementById('modifyArticleTitle');
        modifyArticleTitleBtn.dataset.id = id;
    }

    const modifyArticle = (e) => {
        e.preventDefault();

        if (modifiedArticleTitle.length === 0) return alert('Il titolo deve avere almeno un carattere');

        // console.info(`Modifico articolo, e.target`, e.target);
        // console.info(`Modifico articolo, e.target.dataset.id`, e.target.dataset.id);
        // console.info(`Modifico articolo, modifiedArticleTitle`, modifiedArticleTitle);

        const articleToModify = articlesStateValue.find(article => article.id === parseInt(e.target.dataset.id));
        if (modifiedArticleTitle === articleToModify.title) return alert('Il titolo deve essere differente da quello precedente');

        const newArticlesStateValue = [...articlesStateValue];
        newArticlesStateValue.splice(newArticlesStateValue.indexOf(articleToModify), 1, {id: articleToModify.id, title: modifiedArticleTitle});
        setArticles(newArticlesStateValue);

        const modifyArticleTitleEl = document.getElementById('articleTitleModifier');
        modifyArticleTitleEl.classList.add('d-none');
        setModifiedArticleTitle("");
    }

    return (
        <main className="py-5">

            <div className="container">
                <form onSubmit={(e) => handleFormSubmit(e)}>
                    <div className="input-group mb-3">
                        <input 
                        autoFocus
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
                            Add
                        </button>
                    </div>
                </form>






                <ul className="list-group">
                    {
                        articlesStateValue.map(article => {
                            return (


                                <li key={article.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    {article.title}
                                    <div className="btn-group">
                                        {/* todo: DECIDERE SE FARE MODIFICA CON SELECT E INPUT (COME PER AGGIUNTA) O SE FARE CON QUESTO PULSANTE */}
                                        <button onClick={(e) => showModifyArticle(e.target.dataset.id)} className="btn btn-secondary" data-id={article.id}>
                                            Modify
                                        </button>
                                        <button onClick={(e) => deleteArticle(e.target.dataset.id)} className="btn btn-danger" data-id={article.id}>
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>

            </div>



            <div id="articleTitleModifier" className="d-none">
                <div className="container">

                    <button
                    onClick={() => {
                        const modifyArticleTitleEl = document.getElementById('articleTitleModifier');
                        modifyArticleTitleEl.classList.add('d-none');
                    }}
                    className="btn btn-danger mb-3"
                    type="button"
                    id="closeTitleModification">
                        X
                    </button>

                    <form onSubmit={(e) => modifyArticle(e)} className="w-100">
                        <div className="input-group">
                            <input
                            onChange={(e) => setModifiedArticleTitle(e.target.value)}
                            value={modifiedArticleTitle}
                            type="text"
                            className="form-control"
                            placeholder="Set the new title for the article"
                            aria-label="Set the new title for the article"
                            aria-describedby="modifyArticleTitle" />
                            <button
                            onClick={(e) => modifyArticle(e)}
                            className="btn btn-primary"
                            type="submit"
                            id="modifyArticleTitle">
                                Modify
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </main>
    );
}