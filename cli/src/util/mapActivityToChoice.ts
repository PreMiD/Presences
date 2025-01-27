import type { ChoiceOrSeparatorArray } from 'inquirer-autocomplete-standalone'
import type { ActivityMetadataAndFolder } from './getActivities.js'
import multimatch from 'multimatch'

export function mapActivityToChoice(activity: ActivityMetadataAndFolder): ChoiceOrSeparatorArray<ActivityMetadataAndFolder & {
  versionized: boolean
}>[number] {
  const versionized = multimatch(activity.folder, '**/websites/*/*/v*').length > 0
  return {
    value: { ...activity, versionized },
    name: `${activity.metadata.service}${versionized ? ` (APIv${activity.metadata.apiVersion})` : ''}`,
  }
}
