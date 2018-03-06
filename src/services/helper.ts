export default class Helper {

  messageNotSuccessGeneral()
  {
    return alert("Error. Please try again later.")
  }

  messageSuccessGeneral(msg)
  {
    return alert(msg)
  }

  messageObjectDeleted(msg)
  {
    return alert(msg)
  }

}

export const helper = new Helper();