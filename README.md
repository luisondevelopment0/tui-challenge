# tui-challenge

## Objective
Provide a hotel search api based on price and star numbers. It is also possible to book a reservation in the chosen room.  

## API DOCUMENTATION  

<sub>I thought it would be better to show the curl for each request, thus facilitating the test by the evaluators  </sub>

### 1 - Get available countries   
The user can look for the available destination countries    
   
curl --location --request GET 'https://tui-challenge.herokuapp.com/locations/countries'

### 2 - Get available cities  
The user can look for destination cities  
  
Parameters:  
You should only use the ``countryCode`` that is provided in the previous request (1)   
``keyword``: The city name first characters.  
``limit``: Max number of cities for each response;   
``offset``: Skip cities for each response;    
  
curl --location --request GET 'https://tui-challenge.herokuapp.com/locations/cities?countryCode=es&keyword=mad&limit=10&offset=0'

### 3 - Get offers  
The user can search for best or cheaper hotels
  
Parameters:  
``cityCode``: The city you want to look for offers (Provided on request 2);  
``ratings``: Hotel stars. 1-5;   
``currency``: EUR for instance;  
``priceRange``: Desired price range;    
``limit``: Max number of hotels for each response;   
``offset``: Skip hotels for each response;   
  
curl --location --request GET 'https://tui-challenge.herokuapp.com/hotels?cityCode=BCN&ratings=4&priceRange=90-10000&currency=EUR&limit=10&offset=0'

### 4 - Booking
Place a reservation  
  
Parameters:  
``userId``: Arbitrary key for user distinction  
``offerId``: Arbitrary key for offer distinction  
  
curl --location --request POST 'https://tui-challenge.herokuapp.com/bookings' \
--header 'Content-Type: application/json' \
--data-raw '{
    "userId": "1234",
    "offerId": "321"
}'  

### 5 - Get bookings  
Get bookings by filter  
  
Parameters:  
``limit``: Max number of bookings for each response;   
``offset``: Skip bookings for each response;  
  
curl --location --request GET 'https://tui-challenge.herokuapp.com/bookings?limit=1&offset=0&userId=123&offerId=321'


## A few notes:

Sorry for the delay.  
I ended the api requests quota of AccuWeather and it delayed development.  
The api is not in the way I would like but I tried to do it in the best possible way with the informed timebox.  

## Improvement points:

- Add logging to each income request and response that hits the application;  
- Add logging to each request/response that goes throught axios or another http client;  
- Add exception filter, because right now, the api is not protected from a failure;  
- Add authorization, because right now the api is open to the public.
- On the Get offers (3) endpoint, refactor the weather code. Only request weather api if it's necessary (when forecast dates match offer date). 
- On the Booking (4) endpoint, should validate if desired offer still available 
- Add postman or another tool

--  

*The challenge was really fun and I would like to have a bigger time box to be able to show my knowledge better.  *
*Hope you like it :)  *
  
*Luis Fernando*
