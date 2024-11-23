import random
import math
from geopy.distance import geodesic

def randlonglat(lat,lon,radius_metres):
    """
    Generate a random coordinate to serve as the center of a circle with the specified radius
    (in metres) containing the original (latitude, longitude).
    
    Parameters:
        lat (float): Latitude of the original point.
        lon (float): Longitude of the original point.
        radius_metres (float): Radius in metres for the circle.
    
    Returns:
        dict: A dictionary containing the new center's latitude and longitude.
    """
     # Generate a random distance from the original point within the given radius
    random_distance = random.uniform(0, radius_metres)
    
    # Generate a random angle in radians
    random_angle = random.uniform(0, 2 * math.pi)
    
    # Calculate the offset in metres for both latitude and longitude
    delta_lat = (random_distance * math.cos(random_angle)) / 111320  # metres to degrees
    delta_lon = (random_distance * math.sin(random_angle)) / (111320 * math.cos(math.radians(lat)))
    
    # Calculate the new center point coordinates
    new_lat = lat + delta_lat
    new_lon = lon + delta_lon

    return (new_lat,new_lon)

bath_uni = randlonglat(51.3782,2.3264, 1000)  # Bath Uni, 1000 meter radius
print(bath_uni)

