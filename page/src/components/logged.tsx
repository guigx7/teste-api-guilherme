import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Logged() {

  const logoutToast = () => toast.info('Logged out', {
    position: "top-right",
    autoClose: 3500,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "colored",
    });

  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null); // Definir o tipo de estado como string | null
  const [isValidToken, setIsValidToken] = useState(false);

  const getTokenFromCookie = () => {
    const cookieName = "token=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
      const cookie = cookieArray[i].trim();
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return null; 
};

const getUsernameFromCookie = () => {
  const cookieName = "username=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');

  for (let i = 0; i < cookieArray.length; i++) {
    const cookie = cookieArray[i].trim();
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return null; 
};

  useEffect(() => {
    document.title = "Teste Threeo - Logged in";
    const checkTokenValidity = async () => {
      try {
        const token = getTokenFromCookie(); 
        const username = getUsernameFromCookie(); 
        setUsername(username); 

        if (token) {
          const response = await axios.get("http://localhost:8080/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200) {
            setIsValidToken(true);
          } else {
            setIsValidToken(false);
          }
        } else {
          setIsValidToken(false);
        }
      } catch (error) {
        setIsValidToken(false);
      }
    };

    checkTokenValidity();
  }, []);

  const handleClick = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // alert("Logged out")
    logoutToast();
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <>
      {isValidToken && (
        <main key="1" className="flex h-screen w-full flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Logged in as {username}</h1>
          <Button className="mt-6" variant="default" onClick={handleClick}>
            Logout
          </Button>
          <ToastContainer />
        </main>
      )}
    </>
  );
}

