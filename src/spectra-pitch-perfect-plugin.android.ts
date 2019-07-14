/*
import { Common } from './spectra-pitch-perfect-plugin.common';

export class SpectraPitchPerfectPlugin extends Common {

}
*/

// import * as app from 'tns-core-modules/application';
import {SpectraPitchPerfectOptions} from "./options";

declare var org: any;

export class SpectraPitchPerfectPlugin {

    private _pitchPerfectAsyncTask: any;
    public start(options: SpectraPitchPerfectOptions): Promise<any> {
        console.log('Pitch Perfect Plugin Starting.');
        return new Promise(async (resolve, reject) => {
            try {
                // @ts-ignore
                this._pitchPerfectAsyncTask =
                    new org.eu.transfusion.spectrapitchdetector.PitchDetector.PitchDetectorAsyncTask(
                        new org.eu.transfusion.spectrapitchdetector.OnPitchDetectionListener({
                            onPitchDetectionResult: options.onPitchDetectionResult/*: (pitchHz: Number, probability: Number, isPitched: Boolean) => {
                                console.log('pitch acquired!!');
                                console.log(pitchHz + ' ' + probability + ' ' + isPitched);
                            }*/
                        }));
                this._pitchPerfectAsyncTask.execute(null);
            } catch (ex) {
                console.log(ex);
                reject(ex);
            }
        });
    }

    public stop() {
        return new Promise(async (resolve, reject) => {
            try {
                this._pitchPerfectAsyncTask.cancel(true);
                this._pitchPerfectAsyncTask = null;
            } catch (ex) {
                console.log(ex);
                reject(ex);
            }
        });
    }
}

