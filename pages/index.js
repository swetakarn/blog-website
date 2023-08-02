import {db} from '../firebase'
import Link from 'next/link'
import {useState} from 'react'

export default function Home({Allblogs}) {
   const [blogs,setblogs] = useState(Allblogs)
   const [end,setEnd] = useState(false)
   const [search,setSearch] = useState("")
const searchFilter = blogs.filter((blog) =>
blog.title.toLowerCase().includes(search.toLowerCase())
);

   const loadMore = async ()=>{
     const last  = blogs[blogs.length-1]
     const res = await  db.collection('blogs')
     .orderBy('createdAt','desc')
     .startAfter(new Date(last.createdAt))
     .limit(3)
     .get()
     const newblogs = res.docs.map(docSnap=>{
       return {
        ...docSnap.data(),
        createdAt:docSnap.data().createdAt.toMillis(),
        id:docSnap.id
      }
     })
     setblogs(blogs.concat(newblogs))

     if(newblogs.length < 3){
       setEnd(true)
     }
   }
   const deleteBlog = async (blogId) => {
    if (confirm('Are you sure you want to delete this blog?')) {
      await db.collection('blogs').doc(blogId).delete();
      setblogs(blogs.filter((blog) => blog.id !== blogId));
    }
  };

  return (
    <div className="center container">
      <div className='input-field'><input placeholder='search' value={search} type="text" onChange= {(e) =>  setSearch(e.target.value)}/></div>
        {searchFilter.map(blog=>{
          return(
            <div className="card" key={blog.createdAt}>
            <div className="card-image">
              <img src={blog.imageUrl} />
              <span className="card-title">{blog.title}</span>
            </div>a
            <div className="card-content">
              <p>{blog.body}</p>
            </div>
            <div className="card-action">
              <Link href={`/blogs/${blog.id}`}>Read More</Link>
              {blog.userId === `${blog.id}` && (
              <>
                <button
                  className="btn #fb8c00 orange darken-1"
                  onClick={() => deleteBlog(blog.id)}
                  style={{ marginRight: '10px' }}
                >
                  Delete
                </button>
                <Link href={`/edit-blog/${blog.id}`}>
                  <button className="btn #fb8c00 orange darken-1">Edit</button>
                </Link>
              </>
            )}
            </div>

          </div>
          )
        })}

        {end==false?
        <button className="btn #fb8c00 orange darken-1" onClick={()=>loadMore()}>Load more</button>
         :<h3>You have reached end</h3>
        }

        <style jsx>
           {`
            .card{
              max-width:500px;
              margin:22px auto;
            }
            p{
              display: -webkit-box;
              overflow: hidden;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            }
           `}
        </style>
    </div>
  )
}


export async function getServerSideProps(context) {
  const querySnap =await  db.collection('blogs').orderBy('createdAt',"desc")
  .limit(3)
  .get()
  const Allblogs =  querySnap.docs.map(docSnap=>{
    return {
      ...docSnap.data(),
      createdAt:docSnap.data().createdAt.toMillis(),
      id:docSnap.id
    }
  })


  return {
    props: {Allblogs}, 
  }
}