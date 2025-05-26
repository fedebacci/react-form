import articles from "../../assets/js/data/data"

export default function Main () {

    console.log(articles);
    // todo: capire se spostare fuori export (Serve solo a bloccare caricamento pagina?)
    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("handleFormSubmit started")
    };

    return (
        <main className="py-5">

            <div className="container">
                <form onSubmit={(e) => handleFormSubmit(e)}>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Submit a new article title" aria-label="Submit a new article title" aria-describedby="submitNewArticle" />
                        <button className="btn btn-primary" type="submit" id="submitNewArticle">
                            Button
                        </button>
                    </div>
                </form>





                {
                    articles.map(article => {
                        return (
                            <p>{article.title}</p>
                        );
                    })
                }
            </div>


        </main>
    );
}