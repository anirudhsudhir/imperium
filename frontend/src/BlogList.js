const BlogList = (props) => {
    const blogs = props.blogs;
    const title = props.title;

    return ( 
        <div className="BlogList">
                {blogs.map((blogs)=> (
                <div className="blog-preview" key ={blogs.id}>
                <h2>{blogs.title}</h2>
                <p>Written by{blogs.author}</p>
                </div>
                //<BlogList blogs={blogs} title = "ALL blogs"/> this is a prop 
                //import BlogList from "./BlogList"; , these two lines need to be added in home to call for props  

            ))}
        </div>
     );
}
 
export default BlogList;