"use client";
import React, { ReactNode } from "react";
import * as S from "./Modal.styles";
import ModalPortal from "./ModalPortal";
import Button from "../Button";

interface IProps {
  children: ReactNode;
  open?: boolean;
  show?: boolean;
  title?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  width?: string;
  closeOnOutsideClick?: boolean;
}

export default function ModalLayout({
  children,
  open,
  title,
  show,
  onClose,
  onConfirm,
  width = "320px",
  closeOnOutsideClick = true,
}: IProps) {
  return open ? (
    <ModalPortal>
      <S.ModalWrap
        show={show}
        onClick={closeOnOutsideClick ? onClose : undefined}
        style={{ pointerEvents: "none" }} 
      >
        <S.ModalContainer
          style={{ pointerEvents: "auto" }} 
        >
          <S.ModalInner width={width}>
            <S.ModalContent onClick={(e) => e.stopPropagation()}>
              <button onClick={onClose} className="close-button"></button>
              {children}
              <Button title={title ? title : "확인"} variant={"dark"} onClick={onConfirm} />
            </S.ModalContent>
          </S.ModalInner>
        </S.ModalContainer>
      </S.ModalWrap>
    </ModalPortal>
  ) : null;
}
