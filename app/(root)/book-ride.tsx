import { useUser } from "@clerk/clerk-expo";
import { StripeProvider } from "@stripe/stripe-react-native";
import { Image, Text, View } from "react-native";
import Payment from "@/components/Payment";
import RideLayout from "@/components/RideLayout";
import { icons } from "@/constants";
import { formatTime } from "@/lib/utils";
import { useDriverStore, useLocationStore } from "@/store";

const BookRide = () => {
  const { user } = useUser();
  const {
    userAddress,
    destinationAddress,
    // userLatitude,
    // userLongitude,
    // destinationLatitude,
    // destinationLongitude,
  } = useLocationStore();
  const { selectedDriver } = useDriverStore();
  // const [routeDetails, setRouteDetails] = useState<{
  //   distance: string;
  //   duration: string;
  // } | null>(null);

  // useEffect(() => {
  //   const fetchRouteDetails = async () => {
  //     if (
  //       !userLatitude ||
  //       !userLongitude ||
  //       !destinationLatitude ||
  //       !destinationLongitude
  //     )
  //       return;

  //     try {
  //       const response = await fetch(
  //         `https://router.project-osrm.org/route/v1/driving/${userLongitude},${userLatitude};${destinationLongitude},${destinationLatitude}?overview=false`
  //       );
  //       const data = await response.json();

  //       if (data.routes && data.routes[0]) {
  //         setRouteDetails({
  //           distance: `${(data.routes[0].distance / 1000).toFixed(1)} km`,
  //           duration: `${Math.round(data.routes[0].duration / 60)} mins`,
  //         });
  //       }
  //     } catch (error) {
  //       console.error("Error fetching route details:", error);
  //     }
  //   };

  //   fetchRouteDetails();
  // }, [userLatitude, userLongitude, destinationLatitude, destinationLongitude]);

  return (
    <StripeProvider
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
      merchantIdentifier="merchant.com.uber"
      urlScheme="myapp"
    >
      <RideLayout title="Book Ride" snapPoints={["85%"]}>
        <>
          <Text className="text-xl font-JakartaSemiBold mb-3">
            Ride Information
          </Text>

          <View className="flex flex-col w-full items-center justify-center mt-10">
            <Image
              source={{ uri: selectedDriver?.profile_image_url }}
              className="w-28 h-28 rounded-full"
            />

            <View className="flex flex-row items-center justify-center mt-5 space-x-2">
              <Text className="text-lg font-JakartaSemiBold">
                {selectedDriver?.title}
              </Text>

              <View className="flex flex-row items-center space-x-0.5">
                <Image
                  source={icons.star}
                  className="w-5 h-5"
                  resizeMode="contain"
                />
                <Text className="text-lg font-JakartaRegular">
                  {selectedDriver?.rating}
                </Text>
              </View>
            </View>
          </View>

          <View className="flex flex-col w-full items-start justify-center py-3 px-5 rounded-3xl bg-general-600 mt-5">
            <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
              <Text className="text-lg font-JakartaRegular">Ride Price</Text>
              <Text className="text-lg font-JakartaRegular text-[#0CC25F]">
                ${selectedDriver?.price || 60}
              </Text>
            </View>

            {/* {routeDetails && (
              <>
                <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
                  <Text className="text-lg font-JakartaRegular">Distance</Text>
                  <Text className="text-lg font-JakartaRegular">
                    {routeDetails.distance}
                  </Text>
                </View>

                <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
                  <Text className="text-lg font-JakartaRegular">Duration</Text>
                  <Text className="text-lg font-JakartaRegular">
                    {routeDetails.duration}
                  </Text>
                </View>
              </>
            )} */}

            <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
              <Text className="text-lg font-JakartaRegular">Pickup Time</Text>
              <Text className="text-lg font-JakartaRegular">
                {formatTime(selectedDriver?.time || 5!)}
              </Text>
            </View>

            <View className="flex flex-row items-center justify-between w-full py-3">
              <Text className="text-lg font-JakartaRegular">Car Seats</Text>
              <Text className="text-lg font-JakartaRegular">
                {selectedDriver?.car_seats}
              </Text>
            </View>
          </View>

          <View className="flex flex-col w-full items-start justify-center mt-5">
            <View className="flex flex-row items-center justify-start mt-3 border-t border-b border-general-700 w-full py-3">
              <Image source={icons.to} className="w-6 h-6" />
              <Text className="text-lg font-JakartaRegular ml-2">
                {userAddress || "Pickup Address Not Set"}
              </Text>
            </View>

            <View className="flex flex-row items-center justify-start border-b border-general-700 w-full py-3">
              <Image source={icons.point} className="w-6 h-6" />
              <Text className="text-lg font-JakartaRegular ml-2">
                {destinationAddress || "Destination Address Not Set"}
              </Text>
            </View>
          </View>

          <Payment
            fullName={user?.fullName!}
            email={user?.emailAddresses[0].emailAddress!}
            amount={selectedDriver?.price!}
            driverId={selectedDriver?.id!}
            rideTime={selectedDriver?.time!}
          />
        </>
      </RideLayout>
    </StripeProvider>
  );
};

export default BookRide;
