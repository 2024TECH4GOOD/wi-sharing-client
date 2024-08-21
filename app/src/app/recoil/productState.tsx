"use client";
import { atom } from 'recoil';

/** 모달 온/오프 상태 */
export const modalState = atom<boolean>({
	key: 'modalState',
	default: false,
});

export const confirmModalState = atom<boolean>({
	key: 'confirmModalState',
	default: false,
});

export const infoModalState = atom<boolean>({
	key: 'infoModalState',
	default: false,
});

export const secondModalState = atom<boolean>({
	key: 'secondModalState',
	default: false,
});

export const thirdModalState = atom<boolean>({
	key: 'thirdModalState',
	default: false,
});
