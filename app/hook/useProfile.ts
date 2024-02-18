import { Alert } from "react-native";
import { supabase } from "../lib/supabase";

export async function useProfile() {
	try {
		const { data, error, status } = await supabase
			.from("profiles")
			.select("username, website, avatar_url, friends ( * ) ")
			.single();

		if (error && status !== 406) {
			throw error;
		}

		return data;
	} catch (error) {
		if (error instanceof Error) {
			Alert.alert(error.message);
		}
	}
}
