import { ChoiceOrSeparatorArray } from "inquirer-autocomplete-standalone"
import { ActivityMetadata } from "../classes/ActivityCompiler"

export function mapActivityToChoice(activity: ActivityMetadata, activities: ActivityMetadata[]): ChoiceOrSeparatorArray<{
  activity: ActivityMetadata
  versionized: boolean
}>[number] {
  const isVersionized = activities.filter(a => a.service === activity.service).length > 1
  return {
    value: { activity, versionized: isVersionized },
    name: `${activity.service}${isVersionized ? ` (APIv${activity.apiVersion})` : ''}`,
  }
}
