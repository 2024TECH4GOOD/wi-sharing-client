"use client";
import React, { ReactNode } from 'react';

import Button from '../Button';

import * as S from './Modal.styles';
import ModalLayout from './ModalLayout';

interface IProps {
	children: ReactNode;
	title?: string;
	subtitle?: string;
	open?: boolean;
	onClose?: () => void;
	onOk?: () => void;
	width?: string;
}

export default function Modal({
	children,
	title,
	subtitle,
	open,
	onClose,
	onOk,
	width,
}: IProps) {
	return (
		<ModalLayout onClose={onClose} open={open} width={width}>
			<p className="modal-title">
				{title}
				{subtitle ? '' : <div style={{ paddingBottom: '30px' }}></div>}
			</p>
			{subtitle && <p className="modal-sub-title">{subtitle}</p>}
			{children}
			<S.ModalButtons>
				<Button onClick={onOk} title={'확인'} variant={'dark'}/>
			</S.ModalButtons>
		</ModalLayout>
	);
}
