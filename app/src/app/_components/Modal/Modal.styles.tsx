import styled from '@emotion/styled';

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
`;

export const Content = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
  text-align: center;
`;

export const DetailText = styled.p`
  font-size: 14px;
  margin-bottom: 8px;
  text-align: left;
`;

export const ImageCarousel = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 10px 0;
  gap: 10px;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
`;

export const Image = styled.img`
  width: 100%;
  margin-bottom: 10px;
  border-radius: 10px;
`;

export const ModalWrap = styled.div<{ show?: boolean }>`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	z-index:  ${({ show }) => (show ? '1000' : '1200' )};
`;


export const ModalContainer = styled.div`
	bottom: 0;
	left: 0;
	outline: 0;
	overflow: auto;
	position: fixed;
	right: 0;
	top: 0;
	z-index: 1000;
`;

export const ModalInner = styled.div<{ width?: string }>`
	margin: 0 auto;
	width: ${(props) => props.width};
	padding: 0 0 30px;
	top: 100px;
	position: relative;
`;

export const ModalContent = styled.div`
	position: relative;
	background: #fff;
	border: 2px solid #ffffff;
	border-radius: 20px;
	padding: 30px;
	.close-button {
		position: absolute;
		top: 20px;
		right: 20px;
		width: 20px;
	}
	.modal-title {
		font-weight: 500;
		font-size: 18px;
		line-height: 32px;
		text-align: center;
	}
	.modal-sub-title {
		font-size: 14.5px;
		font-weight: 500;
		line-height: 1.4;
		color: gray;
		padding-bottom: 30px;
		padding-top: 10px;
		text-align: center;
	}
	.info-modal-title {
		font-size: 16px;
		font-weight: 500;
		line-height: 1.4;
		padding-bottom: 30px;
	}
	.info-modal-sub-title {
		font-size: 14.5px;
		font-weight: 500;
		line-height: 1.4;
		color: #00ce7c;
		padding-bottom: 15px;
	}
	.modal-confirm-title {
		font-weight: 500;
		font-size: 22px;
		line-height: 32px;
		text-align: center;
		padding: 60px 0 50px 0;
	}
	.w-full {
		width: 100%;
	}
	.mb10 {
		margin-bottom: 10px;
	}
`;

export const ModalButtons = styled.div`
	display: flex;
	justify-content: center;
	gap: 10px;
	margin-top: 30px;
	&.info-modal-button {
		justify-content: flex-end;
	}
`;

export const Arrange = styled.div`
	.parent {
		display: flex;
		justify-content: flex-end;
	}
	.child {
		display: inline-block;
		vertical-align: middle;
		margin-left: 20px;
	}
`;

export const ToastWrap = styled.div`
	@keyframes fadeIn {
		0% {
			opacity: 0;
			transform: translate3d(-50%, -100%, 0);
		}
		to {
			opacity: 1;
			transform: translate3d(-50%, 0, 0);
		}
	}
	@keyframes fadeOut {
		0% {
			opacity: 1;
			transform: translate3d(-50%, 0, 0);
		}
		to {
			opacity: 0;
			transform: translate3d(-50%, -100%, 0);
		}
	}
	position: fixed;
	top: 1rem;
	left: 50%;
	transform: translateX(-50%);
	padding: 1rem;
	background: #f2f2f2;
	border: 2px solid #ffffff;
	box-shadow: 0px 0px 22px rgba(56, 50, 49, 0.25);
	border-radius: 20px;
	color: #383231;
	display: flex;
	justify-content: space-between;
	align-items: center;
	max-width: 400px;
	font-weight: 500;
	font-size: 18px;
	z-index: 9999;
	animation: fadeIn 0.3s;
	&.hide {
		animation: fadeOut 0.3s;
	}
	.icon-type {
		width: 24px;
		flex: none;
	}
	.toast-message {
		padding-left: 10px;
		span {
			display: inline-block;
			font-size: 14px;
			font-weight: 400;
			color: #9c9c9c;
			padding-top: 6px;
		}
	}
	@media screen and (max-width: 768px) {
		min-width: 170px;
		padding: 0.7rem;
		align-items: flex-start;
		font-size: 14px;
		.icon-type {
			width: 18px;
		}
		.toast-message {
			span {
				font-size: 12px;
			}
		}
	}
`;
