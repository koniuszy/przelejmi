enum Status {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}

export const errorToastContent = {
  title: 'Sth went wrong.',
  description: 'Ups… try again 😱',
  status: Status.ERROR,
  isClosable: true,
}

export const successToastContent = {
  description: 'Whoah! That was fast…',
  status: Status.SUCCESS,
  isClosable: true,
}
