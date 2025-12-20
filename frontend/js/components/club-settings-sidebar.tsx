import React from "react"
import VerticalTabs from "./ui/vertical-tabs"
import type { Club, Tab } from "@/types"
import EditClub from "@/pages/Clubs/Edit"

export function ClubSettingsSidebar({ club }: {
	club: Club
}) {
	const tabs: Tab[] = [
		{
			title: "Settings",
			content: <EditClub club={club} />,
		}
	]
	return (
		<>
			<VerticalTabs tabs={tabs} defaultValue="Settings" />
		</>
	)
}
