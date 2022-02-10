import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import {  updateProfile } from 'firebase/auth'
import { updateDoc, doc,  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc, } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import homeIcon from  '../assets/svg/homeIcon.svg'
import Listingitem from '../components/Listingitem'



const Profile = () => {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
    const auth = getAuth()
    const [changeDetails, setChangeDetails] = useState(false)    
    const [FormData, setFormData] = useState({
        name:auth.currentUser.displayName,
        email:auth.currentUser.email
    })
    const {name, email } = FormData;
    const navigate = useNavigate()

     useEffect(() => {
        const fetchlistings = async () => {
           const listingsRef = collection(db, 'listings')
           const q = query(listingsRef, where('userRef', '==', auth.currentUser.uid),
           orderBy('timestamp', 'desc'),
           )
           const querySnap = await getDocs(q)
           const listings = []
           querySnap.forEach((doc) => {
             return listings.push({
               id:doc.id,
               data:doc.data()
             })
           })
           setListings(listings)
           setLoading(false)
        }
        fetchlistings()



     }, [auth.currentUser.uid])




      const onLogout = () => {
          auth.signOut()
          navigate('/')
      }
  
      const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.id]:e.target.value
        }))
          
      }

      const onSubmit = async () => {
        try {
          if(auth.currentUserdisplayName !== name ) {

            //updating name in firebase
               await updateProfile(auth.currentUser, {
                 displayName:name,
               })
               //update in firestore
               const userRef = doc(db, 'users', auth.currentUser.uid)
               await updateDoc(userRef, {
                 name
               })
          }
          toast.success('user updated successfully..!')
          
        } catch (error) {
          toast.error('Could not update profile details')
        }
        

      }


    const onDelete = async (listingId) => {
      if (window.confirm('Are you sure you want to delete?')) {
        const docRef = doc(db, 'listings', listingId)
        await deleteDoc(docRef)
        const updatedListings = listings.filter(
          (listing) => listing.id !== listingId
        )
        setListings(updatedListings)
        toast.success('Successfully deleted listing')
      }
    }

    const onEdit = (listingId) => {
      navigate(`/edit-listing/${listingId}`)
    }


    return (
        <div className='profile'>
            <header className='profileHeader'>
                <p className='pageHeader'>My Profile</p>
                <button type='button' className='logOut' onClick={onLogout}>Logout</button>

            </header>

         <main>
         <div className='profileDetailsHeader'>
          <p className='profileDetailsText'>Personal Details</p>
          <p
            className='changePersonalDetails'
            onClick={() => {
              changeDetails && onSubmit()
              setChangeDetails((prevState) => !prevState)
            }}
          >
            {changeDetails ? 'done' : 'change'}
          </p>
        </div>
         
         
        <div className='profileCard'>
          <form>
            <input
              type='text'
              id='name'
              className={!changeDetails ? 'profileName' : 'profileNameActive'}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            <input
              type='text'
              id='email'
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>
        <Link to='/create-listing' className='createListing'>
       
          <p>Sell Or Rent Your Home</p>
          <img  src={homeIcon} alt='home' />
        </Link>
              
        {!loading && listings?.length > 0 && (
          <>
            <p className='listingText'>Your Listings</p>
            <ul className='listingsList'>
              {listings.map((listing) => (
                <Listingitem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}


            </main>
        </div>
    )
}

export default Profile
