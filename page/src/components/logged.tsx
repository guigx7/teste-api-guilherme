import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Logged() {
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
        console.error("Erro ao verificar a validade do token:", error);
      }
    };

    checkTokenValidity();
  }, []);

  const handleClick = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    alert("Logged out")
    navigate("/login");
  };

  return (
    <>
      {isValidToken && (
        <main key="1" className="flex h-screen w-full flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Logged in as {username}</h1>
          <Button className="mt-6" variant="default" onClick={handleClick}>
            Logout
          </Button>
        </main>
      )}
    </>
  );
}

