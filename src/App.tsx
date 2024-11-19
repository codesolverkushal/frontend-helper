import Login from './pages/auth/Login';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import VerifyEmail from './pages/auth/VerifyEmail';
import HeroSection from './components/realComponent/HeroSection';
import MainLayout from './layout/MainLayout';
import Profile from './components/realComponent/Profile';
import SearchPage from './components/realComponent/SearchPage';
import RestaurantDetail from './components/realComponent/RestaurantDetail';
import Cart from './components/realComponent/Cart';
import Restaurant from './admin/Restaurant';
import AddMenu from './admin/AddMenu';
import Orders from './admin/Orders';
import Order from './components/realComponent/Order';
import useUserStore from './store/useUserStore';
import { useEffect } from 'react';
import LoadingPage from './skeleton/LoadingPage';
import { useThemeStore } from './store/useThemeStore';


const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  // console.log(isAuthenticated);

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  if (!user?.isVerified) {
    // Redirect to verify-email only if authenticated but not verified
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if(isAuthenticated && user?.isVerified){
    return <Navigate to="/" replace/>
  }
  return children;
};

const AdminRoute = ({children}:{children:React.ReactNode}) => {
  const {user, isAuthenticated} = useUserStore();
  if(!isAuthenticated){
    return <Navigate to="/login" replace/>
  }
  if(!user?.admin){
    return <Navigate to="/" replace/>
  }

  return children;
}

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<ProtectedRoutes><MainLayout/></ProtectedRoutes>,
    children:[
      {
        path:"/",
        element:<HeroSection/>
      },
      {
        path:"/profile",
        element:<Profile/>
      },
      {
        path:"/search/:text",
        element:<SearchPage/>
      },
      {
        path:"/restaurant/:id",
        element:<RestaurantDetail/>
      },
      {
        path:"/cart",
        element:<Cart/>
      },
      {
        path:"/order/status",
        element:<Order/>
      },
      {
        path:"/admin/restaurant",
        element:<AdminRoute><Restaurant/></AdminRoute>
      },
      {
        path:"/admin/menu",
        element:<AdminRoute><AddMenu/></AdminRoute>
      },
      {
        path:"/admin/orders",
        element:<AdminRoute><Orders/></AdminRoute>
      },
     
    ]
  },
  {
    path:"/login",
    element:<AuthenticatedUser><Login/></AuthenticatedUser>
  },
  {
    path:"/signup",
    element:<AuthenticatedUser><SignUp/></AuthenticatedUser>
  },
  {
    path:"/forgot-password",
    element:<AuthenticatedUser><ForgotPassword/></AuthenticatedUser>
  },
  {
    path:"/reset-password",
    element:<AuthenticatedUser><ResetPassword/></AuthenticatedUser>
  },
  {
    path:"/verify-email",
    element:<AuthenticatedUser><VerifyEmail/></AuthenticatedUser>
  }
])
function App() {
  const {checkAuthentication, isCheckingAuth} = useUserStore();
  const initializeTheme = useThemeStore((state:any) => state.initializeTheme);

 
  useEffect(()=>{
    checkAuthentication();
    initializeTheme();
  },[checkAuthentication])

  if(isCheckingAuth) return <LoadingPage/>

  return (
    <>
      <RouterProvider router={appRouter}>
        
      </RouterProvider>
    </>
  )
}

export default App
