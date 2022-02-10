import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Listingitem from '../components/Listingitem'

function Category () {
    const [listings, setListings] = useState(null)
    const [loading, setLoading] = useState(true)
    const [lastFetchedListing, setLastFetchedListing] = useState(null)


    const {categoryName} = useParams()  //const params = useParams()

  useEffect(() => {
      const fetchListings = async () => {
          try {
              const listingsRef = collection(db, 'listings')


              //creating a query
              const q = query(listingsRef,
                where('type', '==', categoryName),   //params.categoryName
                orderBy('timestamp', 'desc'),
                limit(10))

                
               
                //executing a query
                const querySnap = await getDocs(q)

                const lastVisible = querySnap.docs[querySnap.docs.length - 1]
                setLastFetchedListing(lastVisible)
        

                const listings = []

                querySnap.forEach((doc) => {
                   console.log(doc.data());
                    return listings.push({
                      id:doc.id,
                      data:doc.data()
                    })
                  
                })
                setListings(listings)
                setLoading(false)
            
              
          } catch (error) {
              toast.error('could not get places..!')
          }

      }
      fetchListings()
  },[categoryName])


  // Pagination / Load More
  const onFetchMoreListings = async () => {
    try {
      // Get reference
      const listingsRef = collection(db, 'listings')

      // Create a query
      const q = query(
        listingsRef,
        where('type', '==', categoryName),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(10)
      )

      // Execute query
      const querySnap = await getDocs(q)

      const lastVisible = querySnap.docs[querySnap.docs.length - 1]
      setLastFetchedListing(lastVisible)

      const listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setListings((prevState) => [...prevState, ...listings])
      setLoading(false)
    } catch (error) {
      toast.error('Could not fetch listings')
    }
  }



  return (
    <div className='category'>
    <header>
      <p className='pageHeader'>
        {categoryName === 'rent'
          ? 'Places for rent'
          : 'Places for sale'}
      </p>
    </header>

    {loading ? (
      <Loader />
    ) : listings && listings.length > 0 ? (
      <>
        <main>
          <ul className='categoryListings'>
            {listings.map((listing) => (
              <Listingitem listing={listing.data} id={listing.id}
               key={listing.id}/>
            ))}
          </ul>
        </main>

        
        <br />
          <br />
          {lastFetchedListing && (
            <p className='loadMore' onClick={onFetchMoreListings}>
              Load More
            </p>
          )}

        </>):
        (<p>No listings for {categoryName}</p>)
    }
  </div>
  )

};

export default Category;
