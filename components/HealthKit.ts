import AppleHealthKit, {
    HealthValue,
    HealthKitPermissions,
    HealthActivitySummary,
} from 'react-native-health'
import AsyncStorage from '@react-native-async-storage/async-storage';

function convertMilliseconds(ms) {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}:${minutes}`;
}

const HealthKit = () => {

    /* Permission options */
    const permissions = {
        permissions: {
            // read: [AppleHealthKit.Constants.Permissions.HeartRate],
            // write: [AppleHealthKit.Constants.Permissions.Steps],
            read: [AppleHealthKit.Constants.Permissions.ActivitySummary, AppleHealthKit.Constants.Permissions.DateOfBirth, AppleHealthKit.Constants.Permissions.SleepAnalysis]

        },
    } as HealthKitPermissions

    AppleHealthKit.initHealthKit(permissions, (error: string) => {
        /* Called after we receive a response from the system */

        if (error) {
            console.log('[ERROR] Cannot grant permissions!')
        }

        /* Can now read or write to HealthKit */

        // let options = {
        //     startDate: new Date(2020, 1, 1).toISOString(),
        // }

        // AppleHealthKit.getHeartRateSamples(
        //     options,
        //     (callbackError: string, results: HealthValue[]) => {
        //         /* Samples are now collected from HealthKit */
        //     },
        // )

        let options = {
            startDate: new Date(2021, 0, 0).toISOString(), // required
            endDate: new Date().toISOString(), // optional; default now
            limit: 7, // optional; default no limit
            ascending: true, // optional; default false
        }

        AppleHealthKit.getActivitySummary(
            options,
            (err: Object, results: HealthActivitySummary[]) => {
                if (err) {
                    return
                }
                // console.log(results)
            },
        )

        AppleHealthKit.getSleepSamples(
            options, (err: Object, results: HealthValue[]) => {
                if (err) {
                    return;
                }

                let id = 0;

                const sleepData = results.map(key => {
                    const startDate = Date.parse(key.startDate)
                    const endDate = Date.parse(key.endDate)
                    const diff = endDate - startDate
                    id = id + 1
                    return {
                        "id": id,
                        "Date": startDate,
                        "Time": convertMilliseconds(diff)
                    }
                })

                const saveData = async () => {
                    await AsyncStorage.setItem("SleepData", JSON.stringify(sleepData))
                }
                saveData()
                // console.log(sleepData)
            },
        )

    })

}

export default HealthKit