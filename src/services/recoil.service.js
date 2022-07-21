// RECOILING
import { atom, RecoilRoot, useRecoilState } from 'recoil'
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist({
    key: 'process-management',
    storage: localStorage
})

export const userAuthState = atom({
    key: 'pm_admin',
    default: {
        token: null,
        name: '',
        userId: ''
    },
    effects_UNSTABLE: [persistAtom],
})

