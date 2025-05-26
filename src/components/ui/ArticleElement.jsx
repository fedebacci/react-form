export default function ArticleElement ({ article, children }) {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            { children || article.title }
            <button className="btn btn-danger" data-id={article.id}>
                X
            </button>
        </li>
    );
}