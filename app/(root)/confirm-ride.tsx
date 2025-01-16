import CustomButton from "@/components/CustomButton";
import DriverCard from "@/components/DriverCard";
import RideLayout from "@/components/RideLayout";
import { useFetch } from "@/lib/fetch";
import { useDriverStore } from "@/store";
import { MarkerData } from "@/types/type";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { Text, View } from "react-native";

const ConfirmRide = () => {
  const { selectedDriver, setSelectedDriver, setDrivers } = useDriverStore();
  const { data: drivers, loading } = useFetch<MarkerData[]>(`/(api)/driver`);

  if (loading) return <Text>Loading...</Text>;
  return (
    <RideLayout title="Confirm Ride" snapPoints={["55%", "85%"]}>
      <BottomSheetFlatList
        data={drivers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <DriverCard
            item={item}
            selected={selectedDriver === item}
            setSelected={() => setSelectedDriver(item)}
          />
        )}
        ListFooterComponent={() => (
          <View>
            <CustomButton
              title="Select Ride"
              onPress={() => router.push("/(root)/book-ride")}
            />
          </View>
        )}
      />
    </RideLayout>
  );
};

export default ConfirmRide;
