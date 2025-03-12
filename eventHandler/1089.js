async function eventHandler(data, item, callback) {
  console.log("item:", item);
  if (data.length === 0) {
    return;
  }

  function revealPage(page) {
    const filtered = data.filter((item) => {
      item.page === page && item.visible === true;
    });
    return filtered.every((item) => item.page === page);
  }

  function revealFieldVisibilityReverseMode(page, visibleFields) {
    const isAnyFieldsExeptVisible = data.some(
      (item) =>
        !visibleFields.includes(item.name) &&
        item.visible === true &&
        item.page === page
    );
    return isAnyFieldsExeptVisible;
  }

  function findField(name) {
    const field = data.find((item) => item.name === name);
    if (field) {
      return field;
    }
    throw new Error(`Поле ${name} не найдено в данных`);
  }

  function setVisibleByPage(page, visible = true) {
    data.forEach((item) => {
      if (item.page === page) {
        item.visible = visible;
        item.readonly = false;
      }
    });
  }
  function isVisibleFieldsState(page) {
    const filtered = data.filter(
      (item) =>
        item.page === page && item.visible === true && item.required === true
    );

    if (filtered.length === 0) {
      return false;
    }

    return filtered.every((item) => item.state === true);
  }

  function setExcludeFieldsVisibility(
    data,
    someFields,
    pageNumber,
    visibility
  ) {
    data.forEach((item) => {
      if (item.page === pageNumber) {
        if (!someFields.includes(item.name)) {
          item.visible = visibility;
        }
      }
    });
  }

  function setIncludesFieldsVisibility(
    data,
    someFields,
    pageNumber,
    visibility
  ) {
    data.forEach((item) => {
      if (item.page === pageNumber) {
        if (someFields.includes(item.name)) {
          item.visible = visibility;
        }
      }
    });
  }

  function setReverseVisibleForSomeFieldsOnCurPage(
    data,
    someFields,
    pageNumber,
    visibility
  ) {
    data.forEach((item) => {
      if (item.page === pageNumber) {
        if (someFields.includes(item.name)) {
          item.visible = visibility;
        }
        if (!someFields.includes(item.name)) {
          item.visible = !visibility;
          if (item.name === "NWEIGHT") {
          }
        }
      }
    });
  }

  const IDCOUNTRYDOC = findField("IDPHOLDER_COUNTRY");
  const IDDOCTYPE = findField("IDPHOLDER_DOCTYPE");
  const BUTTON_NEXT = findField("BUTTON_NEXT");
  const button_nextToPolicy = findField("BUTTON_NEXT_POLICYHOLDER");
  const svin = findField("SVIN");
  const sModel = findField("SMODEL");
  const model = findField("IDMODEL");
  const IDBRAND = findField("IDBRAND");
  const IDMODEL = findField("IDMODEL");
  const BNO_VIN = findField("BNO_VIN");
  const INFO_TS = findField("INFO_TS");
  const saveBtn = findField("Save");
  const regNum = findField("SREGNUM");

  const SREG_NUMBER = {
    name: "SREG_NUMBER MOCK",
    label: "SREG_NUMBER MOCK",
    value: "SREG_NUMBER MOCK",
  };

  const NPOWER = findField("NPOWER");
  const NKVT_POWER = findField("NKVT_POWER");
  const lisOwner = findField("LISOWNER");
  const vehDocDate = findField("DVEHDOCDATE");
  const bodyNumber = findField("SBODYNUMBER");
  const isSaved = window.location.pathname.split("/").pop() !== "0";
  const writeDownSnils = findField("BPHOLDER_SNILS");
  const snilsField = findField("SPHOLDER_SNILS");
  const writeDownOwnerSnils = findField("BOWNER_SNILS");
  const snilsOwnerField = findField("SOWNER_SNILS");
  const ts_type = findField("IDVEHICLETYPE");
  const weight = findField("NWEIGHT");
  const tonnage = findField("NTONNAGE");
  const seatsCount = findField("NSEATS_COUNT");
  const personType = findField("NPERSONTYPE");
  const snilsHolder = findField("SPHOLDER_SNILS");
  const insuredPerson = findField("ITEM_Devider_PHOLDER");

  const dataVehdoc = findField("DATA_VEHDOC");

  const TRANSPORT_BLOCK = 2;
  const HOLDER_BLOCK = 3;
  const POLICY_HOLDER = 4;
  const OWNER_BLOCK = 5;

  const phoneOwner = findField("SPHOLDER_PHONE");

  const alwaysVisibleFieldsTransportBlock = [
    "SREGNUMTITLE",
    "SREGNUM",
    "IDVEHICLE_POLICY",
    "Save",
    "input_label_err_regnum_not_fou",
    "EMPTY_01",
  ];
  const visibleFieldsTransportBlockNoNumber = [
    "SREGNUMTITLE",
    "SREGNUM",
    "IDVEHICLE_POLICY",
    "input_label_err_regnum_not_fou",
    "EMPTY_01",
  ];

  if (item.name === "SREGNUM") {
    if (!Object.hasOwn(regNum, "afterSave")) {
      if (item.value === "N") {
        setVisibleByPage(HOLDER_BLOCK, false);
        setVisibleByPage(POLICY_HOLDER, false);
        setVisibleByPage(OWNER_BLOCK, false);

        const visibleFieldsVehicleBlock = [
          "SREGNUMTITLE",
          "SREGNUM",
          "IDVEHICLE_POLICY",
          "Save",
          "input_label_err_regnum_not_fou",
          "NWEIGHT",
          "NTONNAGE",
          "NSEATS_COUNT",
        ];

        setExcludeFieldsVisibility(
          data,
          visibleFieldsVehicleBlock,
          TRANSPORT_BLOCK,
          true
        );

        const fielsVisible = ["SBODYNUMBER"];
        const fieldsInVisible = ["SVIN"];
        if (BNO_VIN.value === false) {
          setIncludesFieldsVisibility(
            data,
            fielsVisible,
            TRANSPORT_BLOCK,
            false
          );
          setIncludesFieldsVisibility(
            data,
            fieldsInVisible,
            TRANSPORT_BLOCK,
            true
          );
        }

        if (BNO_VIN.value === true) {
          setIncludesFieldsVisibility(
            data,
            fielsVisible,
            TRANSPORT_BLOCK,
            true
          );
          setIncludesFieldsVisibility(
            data,
            fieldsInVisible,
            TRANSPORT_BLOCK,
            false
          );
        }

        // отображаем / не отображаем поля "тоннаж","грузоподьемность","кол-во мест" при переходе на вкладку  TRANSPORT_BLOCK
        if (ts_type.value === 4 || ts_type.value === 17) {
          setIncludesFieldsVisibility(
            data,
            ["NWEIGHT", "NTONNAGE", "NSEATS_COUNT"],
            TRANSPORT_BLOCK,
            true
          );
        } else if (ts_type.value !== 4 || ts_type.value !== 17) {
          setIncludesFieldsVisibility(
            data,
            ["NWEIGHT", "NTONNAGE", "NSEATS_COUNT"],
            TRANSPORT_BLOCK,
            false
          );
        }
      }

      if (item.value === "") {
        setVisibleByPage(HOLDER_BLOCK, false);
        setVisibleByPage(POLICY_HOLDER, false);
        setVisibleByPage(OWNER_BLOCK, false);
        setReverseVisibleForSomeFieldsOnCurPage(
          data,
          visibleFieldsTransportBlockNoNumber,
          TRANSPORT_BLOCK,
          true
        );
      }

      if (!isSaved) {
        if (item.value !== "" && item.value !== "N") {
          saveBtn.visible = true;
        } else {
          saveBtn.visible = false;
        }
      }

      // Изменение номера при сохраненном id
      if (isSaved) {
        if (item.value !== "" && item.value !== "N") {
          setReverseVisibleForSomeFieldsOnCurPage(
            data,
            visibleFieldsTransportBlockNoNumber,
            TRANSPORT_BLOCK,
            true
          );
          saveBtn.visible = true;
        } else if (item.value === "N") {
          setVisibleByPage(HOLDER_BLOCK, false);
          setVisibleByPage(POLICY_HOLDER, false);
          setVisibleByPage(OWNER_BLOCK, false);

          const visibleFieldsVehicleBlock = [
            "SREGNUMTITLE",
            "SREGNUM",
            "IDVEHICLE_POLICY",
            "Save",
            "input_label_err_regnum_not_fou",
            "NWEIGHT",
            "NTONNAGE",
            "NSEATS_COUNT",
          ];

          setExcludeFieldsVisibility(
            data,
            visibleFieldsVehicleBlock,
            TRANSPORT_BLOCK,
            true
          );

          const fielsVisible = ["SBODYNUMBER"];
          const fieldsInVisible = ["SVIN"];
          if (BNO_VIN.value === false) {
            setIncludesFieldsVisibility(
              data,
              fielsVisible,
              TRANSPORT_BLOCK,
              false
            );
            setIncludesFieldsVisibility(
              data,
              fieldsInVisible,
              TRANSPORT_BLOCK,
              true
            );
          }

          if (BNO_VIN.value === true) {
            setIncludesFieldsVisibility(
              data,
              fielsVisible,
              TRANSPORT_BLOCK,
              true
            );
            setIncludesFieldsVisibility(
              data,
              fieldsInVisible,
              TRANSPORT_BLOCK,
              false
            );
          }

          // отображаем / не отображаем поля "тоннаж","грузоподьемность","кол-во мест" при переходе на вкладку  TRANSPORT_BLOCK
          if (ts_type.value === 4 || ts_type.value === 17) {
            setIncludesFieldsVisibility(
              data,
              ["NWEIGHT", "NTONNAGE", "NSEATS_COUNT"],
              TRANSPORT_BLOCK,
              true
            );
          } else if (ts_type.value !== 4 || ts_type.value !== 17) {
            setIncludesFieldsVisibility(
              data,
              ["NWEIGHT", "NTONNAGE", "NSEATS_COUNT"],
              TRANSPORT_BLOCK,
              false
            );
          }
        } else {
          setReverseVisibleForSomeFieldsOnCurPage(
            data,
            visibleFieldsTransportBlockNoNumber,
            TRANSPORT_BLOCK,
            true
          );
          setVisibleByPage(HOLDER_BLOCK, false);
          setVisibleByPage(POLICY_HOLDER, false);
          setVisibleByPage(OWNER_BLOCK, false);
          saveBtn.visible = false;
        }
      }
    }
  }

  // Валидируем дату выдачи документа
  if (item.name === "DVEHDOCDATE") {
    const currentDate = new Date();

    const [dFrom, mFrom, yFrom] = item.value.split(".");
    const dateInputDate = new Date(yFrom, +mFrom - 1, dFrom);

    if (dateInputDate > currentDate) {
      vehDocDate.error = "Введенная дата не может быть позже текущей";
      vehDocDate.state = false;
    }

    const minDate = 1920;

    if (dateInputDate <= currentDate) {
      vehDocDate.error = null;
      vehDocDate.state = true;
    }

    if (Number(minDate) > Number(yFrom)) {
      vehDocDate.error = "Введенная дата не может быть раньше 1920 года";
      vehDocDate.state = false;
    }
  }

  // Выбор чипсы
  if (item.name === "IDVEHICLE_POLICY") {
    setVisibleByPage(HOLDER_BLOCK, false);
    setVisibleByPage(POLICY_HOLDER, false);
    setVisibleByPage(OWNER_BLOCK, false);

    setReverseVisibleForSomeFieldsOnCurPage(
      data,
      visibleFieldsTransportBlockNoNumber,
      TRANSPORT_BLOCK,
      true
    );

    saveBtn.visible = true;

    if (regNum.value === "N") {
      regNum.value = "";
    }
  }

  if (item.name === "IDBRAND") {
    if (!IDBRAND.value) {
      IDMODEL.visible = true;
    }
    if (IDBRAND.value) {
      IDMODEL.visible = true;
    }
  }

  // Модель (не нашли в списке)
  if (item.name === "IDMODEL") {
    if (model.value) {
      const idModelText = IDMODEL.options.find(
        (item) => item.value === IDMODEL.value
      ).text;
      const brandValue = IDBRAND.options.find(
        (item) => item.value === IDBRAND.value
      ).text;

      if (brandValue === sModel.value) {
        sModel.value = `${sModel.value} ${idModelText}`;
      }

      if (brandValue !== sModel.value) {
        sModel.value = `${brandValue} ${idModelText}`;
      }
    }
  }

  if (item.name === "SMODEL") {
    // Валидируем поле (не более 160 символов)
    if (item.value.length > 160) {
      sModel.state = false;
      sModel.error = "Значение поля не должно превышать 160 символов";
    }

    if (item.value.length <= 160) {
      sModel.state = null;
      sModel.error = null;
    }

    if (item.value === "") {
      sModel.state = null;
      sModel.error = null;
    }
  }

  if (Object.hasOwn(sModel, "value")) {
    if (sModel.value.length > 1 && sModel.value.length <= 160) {
      sModel.state = true;
      sModel.error = null;
    }
  }

  if (Object.hasOwn(bodyNumber, "value")) {
    const page = revealPage(TRANSPORT_BLOCK);

    if (page === TRANSPORT_BLOCK) {
      if (BNO_VIN.value === false) {
        bodyNumber.visible = false;
      }
    }
  }

  if (!Object.hasOwn(bodyNumber, "value")) {
    // Проблемы с прицепом
    const page = revealPage(TRANSPORT_BLOCK);
    if (page === TRANSPORT_BLOCK) {
      if (BNO_VIN.value === false) {
        bodyNumber.visible = false;
      }
    }
  }

  // Переключаем видимость полей СНИЛС по заполнению checkbox во вкладке Страхователь

  if (writeDownSnils.value === true && insuredPerson.visible === true) {
    snilsField.visible = true;
  }

  if (writeDownSnils.value === false) {
    snilsField.visible = false;
  }

  if (item.name === "BPHOLDER_SNILS") {
    if (item.value === true) {
      snilsField.visible = true;
    }

    if (item.value === false) {
      snilsField.visible = false;
    }
  }

  // определяем видимость поля страхователь и делаем поля ридонли при их заполненности

  if (isVisibleFieldsState(POLICY_HOLDER)) {
    data.forEach((item) => {
      if (
        (item.page === POLICY_HOLDER &&
          item.state === true &&
          item.visible === true &&
          item.name !== "SPHOLDER_PHONE" &&
          item.name !== "SPHOLDER_EMAIL") ||
        item.name === "SPHOLDER_THIRD"
      ) {
        item.readonly = true;
      }
    });
  }

  // Переключаем видимость у полей тоннаж,кол-во мест,грузо-сть
  // "IDVEHICLETYPE"
  // ts_type.value
  if (item.name === "IDVEHICLETYPE") {
    if (item.value === 4 || item.value === 17) {
      weight.visible = true;
      tonnage.visible = true;
      seatsCount.visible = true;
    } else {
      weight.visible = false;
      tonnage.visible = false;
      seatsCount.visible = false;
    }
  }

  //  Поле модель выбрано (не Иное)  скрываем поле "Модель не нашли в списке"
  const textValueModel = model.options.find((el) => el.value === model.value);
  if (textValueModel === undefined) {
    // sModel.visible = false;
  }

  // Валидация полей мощности
  // лошадиные силы
  if (item.name === "NPOWER") {
    const fieldNHORSE = findField("NPOWER");
    // Условие если пользователь ввел больше 999
    if (item.value > 999) {
      fieldNHORSE.state = false;
      fieldNHORSE.error = "Значение должно быть от 1 до 999";
    }
    // условие если пользователь ввел 0
    else if (item.value < 1) {
      const fieldNKH = findField("NKVT_POWER");
      fieldNKH.value = null;
      if (fieldNHORSE.state !== null) {
        fieldNKH.state = null;
        fieldNKH.error = "Некорректное значение";
      }
      fieldNHORSE.state = false;
      fieldNHORSE.error = "Значение должно быть от 1 до 999";
    } else if (!item.value) {
      fieldNHORSE.state = false;
    } else {
      const fieldNKH = findField("NKVT_POWER");
      fieldNKH.value = Math.round((Number(item.value) * 100) / 1.3596) / 100;
      fieldNKH.state = true;
      delete fieldNKH.error;
      fieldNHORSE.state = true;
      delete fieldNHORSE.error;
    }
  }

  // КВТ
  if (item.name === "NKVT_POWER") {
    const fieldNKH = findField("NKVT_POWER");
    // условие если пользователь ввел число больше 734.77
    if (item.value > 734.77) {
      fieldNKH.state = false;
      fieldNKH.error = "Значение должно быть от 1 до 734.77";
      // условие если пользователь ввел 0
    } else if (item.value < 1) {
      const fieldNHORSE = findField("NPOWER");
      fieldNHORSE.value = null;
      if (fieldNKH.state !== null) {
        fieldNHORSE.state = null;
        fieldNHORSE.error = "Некорректное значение";
      }
      fieldNKH.state = false;
      fieldNKH.error = "Значение должно быть от 1 до 734.77";
    } else if (!item.value) {
      fieldNKH.state = false;
    } else {
      const fieldNHORSE = findField("NPOWER");
      fieldNHORSE.value = Math.round(Number(item.value) * 100 * 1.3596) / 100;
      fieldNHORSE.state = true;
      delete fieldNHORSE.error;
      fieldNKH.state = true;
      delete fieldNKH.error;
    }
  }

  if (item.name === "BNO_VIN") {
    if (BNO_VIN.value === true) {
      data.find((f) => f.name === "SBODYNUMBER").visible = true;
    } else {
      data.find((f) => f.name === "SBODYNUMBER").visible = false;
    }
  }

  // При отсутствии VIN скрываем поле
  if (item.name === "BNO_VIN") {
    if (BNO_VIN.value === true) {
      data.find((f) => f.name === "SBODYNUMBER").visible = true;
      data.find((f) => f.name === "SVIN").visible = false;
    } else {
      data.find((f) => f.name === "SBODYNUMBER").visible = false;
      data.find((f) => f.name === "SVIN").visible = true;
    }
  }

  // Проверка VIN на количество символов
  if (item.name === "SVIN") {
    if (svin.mask.length > svin.value.length) {
      svin.error = "VIN должен состоять из 17 символов";
      svin.state = false;
    }
    if (svin.mask.length === svin.value.length) {
      svin.error = null;
      svin.state = true;
    }
  }

  if (item.name === "IDPHOLDER_COUNTRY") {
    if (IDCOUNTRYDOC.value) {
      IDDOCTYPE.visible = true;
    }
  }

  // Настраиваем логику видимости полей при checkbox 'страхователь является собственником' при загрузке страницы
  if (item.name === "LISOWNER") {
    if (item.value === false) {
      if (parseInt(personType.value) === 1) {
        const fieldsVisible =
          writeDownOwnerSnils.value === true
            ? [
                "Continue",
                "LISOWNER",
                "NPERSONTYPE",
                "OWNER_BACK_TS",
                "ITEM_Devider_OWNER",
                "SOWNER_SECOND",
                "SOWNER_FIRST",
                "DOWNER_BIRTHDATE",
                "SOWNER_THIRD",
                "SOWNER_PHONE",
                "SOWNER_EMAIL",
                "IDOWNER_COUNTRY",
                "IDOWNER_DOCTYPE",
                "SOWNER_SERIES",
                "SOWNER_PNUMBER",
                "SFULLOWNER_ADDRESS",
                "BOWNER_SNILS",
                "SOWNER_SNILS",
              ]
            : [
                "Continue",
                "LISOWNER",
                "NPERSONTYPE",
                "OWNER_BACK_TS",
                "ITEM_Devider_OWNER",
                "SOWNER_SECOND",
                "SOWNER_FIRST",
                "DOWNER_BIRTHDATE",
                "SOWNER_THIRD",
                "SOWNER_PHONE",
                "SOWNER_EMAIL",
                "IDOWNER_COUNTRY",
                "IDOWNER_DOCTYPE",
                "SOWNER_SERIES",
                "SOWNER_PNUMBER",
                "SFULLOWNER_ADDRESS",
                "BOWNER_SNILS",
              ];

        setReverseVisibleForSomeFieldsOnCurPage(
          data,
          fieldsVisible,
          OWNER_BLOCK,
          true
        );
      } else if (parseInt(personType.value) === 2) {
        const fieldsVisible = [
          "Continue",
          "LISOWNER",
          "NPERSONTYPE",
          "OWNER_BACK_TS",
          "ITEM_Devider_OWNER",
          "SJUR_INN",
          "SJUR_NAME",
          "SJUR_PHONE",
          "IDJUR_DOCTYPE",
          "SJUR_SERIES",
          "SJUR_NUMBER",
          "SJUR_ADDRESS",
        ];
        setReverseVisibleForSomeFieldsOnCurPage(
          data,
          fieldsVisible,
          OWNER_BLOCK,
          true
        );
      } else if (
        parseInt(personType.value) !== 2 &&
        parseInt(personType.value) !== 1
      ) {
        setVisibleByPage(OWNER_BLOCK);
      }
    }

    if (item.value === true) {
      console.log("true");
      const fieldsVisible = [
        "OWNER_BACK_TS",
        "ITEM_Devider_OWNER",
        "LISOWNER",
        "Continue",
      ];
      setReverseVisibleForSomeFieldsOnCurPage(
        data,
        fieldsVisible,
        OWNER_BLOCK,
        true
      );
    }
  }

  // Переключение физика/юрика вручную
  if (item.name === "NPERSONTYPE") {
    if (parseInt(item.value) === 1) {
      const fieldsVisible = [
        "LISOWNER",
        "Continue",
        "NPERSONTYPE",
        "OWNER_BACK_TS",
        "ITEM_Devider_OWNER",
        "SOWNER_SECOND",
        "SOWNER_FIRST",
        "DOWNER_BIRTHDATE",
        "SOWNER_THIRD",
        "SOWNER_PHONE",
        "SOWNER_EMAIL",
        "IDOWNER_COUNTRY",
        "IDOWNER_DOCTYPE",
        "SOWNER_SERIES",
        "SOWNER_PNUMBER",
        "SFULLOWNER_ADDRESS",
        "BOWNER_SNILS",
        "SOWNER_SNILS",
      ];
      setReverseVisibleForSomeFieldsOnCurPage(
        data,
        fieldsVisible,
        OWNER_BLOCK,
        true
      );
    }

    if (parseInt(item.value) === 2) {
      const fieldsVisible = [
        "LISOWNER",
        "Continue",
        "NPERSONTYPE",
        "OWNER_BACK_TS",
        "ITEM_Devider_OWNER",
        "SJUR_INN",
        "SJUR_NAME",
        "SJUR_PHONE",
        "IDJUR_DOCTYPE",
        "SJUR_SERIES",
        "SJUR_NUMBER",
        "SJUR_ADDRESS",
      ];
      setReverseVisibleForSomeFieldsOnCurPage(
        data,
        fieldsVisible,
        OWNER_BLOCK,
        true
      );
    }
  }

  // управляем видимостью кнопки Далее на первой вкладке
  if (isVisibleFieldsState(TRANSPORT_BLOCK)) {
    BUTTON_NEXT.visible = true;
  }

  if (!isVisibleFieldsState(TRANSPORT_BLOCK)) {
    BUTTON_NEXT.visible = false;
  }

  // Управляем видимостью кнопки Save
  const isAnyFieldsOnTransportBlockPageVisible =
    revealFieldVisibilityReverseMode(
      TRANSPORT_BLOCK,
      alwaysVisibleFieldsTransportBlock
    );

  // ошибка с видимостью поля Save

  if (isAnyFieldsOnTransportBlockPageVisible) {
    saveBtn.visible = false;
  }

  if (item.name === "BUTTON_NEXT") {
    // Скрываем поле Номер кузова
    bodyNumber.visible = false;

    if (lisOwner.value === true) {
      const controls = [];
      setExcludeFieldsVisibility(data, controls, HOLDER_BLOCK, true);
    }

    if (lisOwner.value === false) {
      setVisibleByPage(HOLDER_BLOCK);
    }

    // Скрываем  поле INFO_TS
    INFO_TS.visible = false;
    const fieldsNext = ["SREGNUMTITLE", "SREGNUM", "IDVEHICLE_POLICY"];
    setReverseVisibleForSomeFieldsOnCurPage(
      data,
      fieldsNext,
      TRANSPORT_BLOCK,
      true
    );

    INFO_TS.value = ` <div class="row">
  <div class="col-sm-12 col-md-12 col-lg-4 col-xl-nan col-12">
  <div role="group" class="form-group">
  <label for="${SREG_NUMBER.name}" class="d-block"
  ><span>${SREG_NUMBER.label}</span></label
  >
  <div>
  <div>${SREG_NUMBER.value}</div>
  </div>
  </div>
  </div>
  <div class="col-sm-12 col-md-12 col-lg-4 col-xl-nan col-12">
  <div role="group" class="form-group">
  <label for="${NPOWER.name}" class="d-block"
  ><span>${NPOWER.label}</span></label
  >
  <div>
  <div>${NPOWER.value}</div>
  </div>
  </div>
  </div>
  <div class="col-sm-12 col-md-12 col-lg-4 col-xl-nan col-12">
  <div role="group" class="form-group">
  <label for="${NKVT_POWER.name}" class="d-block"
  ><span>${NKVT_POWER.label}</span></label
  >
  <div>
  <div>${NKVT_POWER.value}</div>
  </div>
  </div>
  </div>
  </div>
  `;
  }

  // управляем видимостью кнопки "Далее" блока второй вкладки
  if (isVisibleFieldsState(HOLDER_BLOCK)) {
    button_nextToPolicy.readonly = false;
  }

  // если поле на странице не прошло валидацию делаем кнопку readOnly
  if (isVisibleFieldsState(HOLDER_BLOCK) === false) {
    button_nextToPolicy.readonly = true;
  }

  const allData = document.querySelector(`[field-id="${dataVehdoc.fieldId}"]`);

  const docsVehicle = document.querySelector(
    `[field-id="${dataVehdoc.fieldId}"]`
  );

  const pHolderData = document.querySelector(
    `[field-id="${phoneOwner.fieldId}"]`
  );

  // скролл до Общие сведения о ТС
  if (allData) {
    allData.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  // скролл до Документы ТС
  if (docsVehicle) {
    docsVehicle.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  // скролл до Страхователя
  if (pHolderData) {
    pHolderData.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  if (item.name === "BACK_GENERAL_INFO") {
    let fieldsInVisible;
    const fieldsVisible = ["NWEIGHT", "NTONNAGE", "NSEATS_COUNT"];

    // отображаем / не отображаем svin при переходе на вкладку  TRANSPORT_BLOCK
    if (BNO_VIN.value === false) {
      fieldsInVisible = ["Save", "SBODYNUMBER"];
    }

    if (BNO_VIN.value === true) {
      fieldsInVisible = ["Save", "SVIN"];
    }

    setExcludeFieldsVisibility(data, fieldsInVisible, TRANSPORT_BLOCK, true);
    setExcludeFieldsVisibility(data, [], HOLDER_BLOCK, false);

    // отображаем / не отображаем поля "тоннаж","грузоподьемность","кол-во мест" при переходе на вкладку  TRANSPORT_BLOCK
    if (ts_type.value === 4 || ts_type.value === 17) {
      setIncludesFieldsVisibility(data, fieldsVisible, TRANSPORT_BLOCK, true);
    } else if (ts_type.value !== 4 || ts_type.value !== 17) {
      setIncludesFieldsVisibility(data, fieldsVisible, TRANSPORT_BLOCK, false);
    }
  }

  if (item.name === "BUTTON_NEXT_POLICYHOLDER") {
    setExcludeFieldsVisibility(data, [], POLICY_HOLDER, true);
    setExcludeFieldsVisibility(data, [], HOLDER_BLOCK, false);
    //
    const fieldsShow = [
      "ITEM_Devider_OWNER",
      "LISOWNER",
      "OWNER_BACK_TS",
      "Continue",
    ];
    setIncludesFieldsVisibility(data, fieldsShow, OWNER_BLOCK, true);
    //
    if (lisOwner.value === false) {
      if (parseInt(personType.value) === 1) {
        const fieldsVisible =
          writeDownOwnerSnils.value === true
            ? [
                "Continue",
                "LISOWNER",
                "NPERSONTYPE",
                "OWNER_BACK_TS",
                "ITEM_Devider_OWNER",
                "SOWNER_SECOND",
                "SOWNER_FIRST",
                "DOWNER_BIRTHDATE",
                "SOWNER_THIRD",
                "SOWNER_PHONE",
                "SOWNER_EMAIL",
                "IDOWNER_COUNTRY",
                "IDOWNER_DOCTYPE",
                "SOWNER_SERIES",
                "SOWNER_PNUMBER",
                "SFULLOWNER_ADDRESS",
                "BOWNER_SNILS",
                "SOWNER_SNILS",
              ]
            : [
                "Continue",
                "LISOWNER",
                "NPERSONTYPE",
                "OWNER_BACK_TS",
                "ITEM_Devider_OWNER",
                "SOWNER_SECOND",
                "SOWNER_FIRST",
                "DOWNER_BIRTHDATE",
                "SOWNER_THIRD",
                "SOWNER_PHONE",
                "SOWNER_EMAIL",
                "IDOWNER_COUNTRY",
                "IDOWNER_DOCTYPE",
                "SOWNER_SERIES",
                "SOWNER_PNUMBER",
                "SFULLOWNER_ADDRESS",
                "BOWNER_SNILS",
              ];

        setReverseVisibleForSomeFieldsOnCurPage(
          data,
          fieldsVisible,
          OWNER_BLOCK,
          true
        );
      } else if (parseInt(personType.value) === 2) {
        const fieldsVisible = [
          "Continue",
          "LISOWNER",
          "NPERSONTYPE",
          "OWNER_BACK_TS",
          "ITEM_Devider_OWNER",
          "SJUR_INN",
          "SJUR_NAME",
          "SJUR_PHONE",
          "IDJUR_DOCTYPE",
          "SJUR_SERIES",
          "SJUR_NUMBER",
          "SJUR_ADDRESS",
        ];
        setReverseVisibleForSomeFieldsOnCurPage(
          data,
          fieldsVisible,
          OWNER_BLOCK,
          true
        );
      } else if (
        parseInt(personType.value) !== 2 &&
        parseInt(personType.value) !== 1
      ) {
        setVisibleByPage(OWNER_BLOCK);
      }
    }
    if (item.value === true) {
      const fieldsVisible = [
        "OWNER_BACK_TS",
        "ITEM_Devider_OWNER",
        "LISOWNER",
        "Continue",
      ];
      setReverseVisibleForSomeFieldsOnCurPage(
        data,
        fieldsVisible,
        OWNER_BLOCK,
        true
      );
    }
    //
  }

  // Управляем видимостью поля "Владаелец СНИЛС"

  if (item.name === "BOWNER_SNILS") {
    if (item.value === true) {
      snilsOwnerField.visible = true;
    } else if (item.value !== true) {
      snilsOwnerField.visible = false;
    }
  }

  if (item.name === "OWNER_BACK_TS") {
    let controls;
    if (BNO_VIN.value === true) {
      controls = [
        "SREGNUMTITLE",
        "SREGNUM",
        "IDVEHICLE_POLICY",
        "Save",
        "BUTTON_NEXT",
        "SVIN",
        "Continue",
        "NWEIGHT",
        "NTONNAGE",
        "NSEATS_COUNT",
      ];
    }

    if (BNO_VIN.value === false) {
      controls = [
        "SREGNUMTITLE",
        "SREGNUM",
        "IDVEHICLE_POLICY",
        "Save",
        "BUTTON_NEXT",
        "SBODYNUMBER",
        "Continue",
        "NWEIGHT",
        "NTONNAGE",
        "NSEATS_COUNT",
      ];
    }

    if (isSaved) {
      const fieldsHide = ["Save"];
      setIncludesFieldsVisibility(data, fieldsHide, TRANSPORT_BLOCK, false);
    }

    setExcludeFieldsVisibility(data, controls, HOLDER_BLOCK, true);

    // При переключении назад убираем поле СНИЛС, если оно было видимо
    if (writeDownSnils.value === true) {
      writeDownOwnerSnils.value = false;
      setIncludesFieldsVisibility(
        data,
        ["SPHOLDER_SNILS"],
        POLICY_HOLDER,
        false
      );
      snilsHolder.visible = false;
    }

    setVisibleByPage(OWNER_BLOCK, false);
    setVisibleByPage(POLICY_HOLDER, false);
  }

  const dataCopy = JSON.parse(JSON.stringify(data));
  const dataSet = dataCopy.map((e) => {
    if (e.name === "SREGNUM") {
      const { afterSave, ...rest } = e;

      return rest;
    }
    return e;
  });

  return dataSet;
}

function initHandler(data, item) {
  const TRANSPORT_BLOCK = 2;
  const HOLDER_BLOCK = 3;
  const OWNER_BLOCK = 4;
  const BUTTON_OPEN = "BUTTON_OPEN";
  const BUTTON_NEXT = "BUTTON_NEXT";
  const isSaved = window.location.pathname.split("/").pop() !== "0";
  const idBrand = data.find(({ name }) => name === "IDBRAND");
  const sModel = data.find((f) => f.name === "SMODEL");
  const idModel = data.find((f) => f.name === "IDMODEL");
  const doctype = data.find((f) => f.name === "IDVEHDOCTYPE");
  const vehical = data.find((f) => f.name === "IDVEHICLETYPE");

  // doctype.visible = false;
  // vehical.visible = false;

  function setVisibleByPage(page) {
    data.forEach((item) => {
      if (
        item.page === page &&
        item.name !== BUTTON_NEXT &&
        item.name !== "SBODYNUMBER"
      ) {
        item.visible = true;
        item.readonly = false;
      }
    });
  }

  function setReverseVisibleForSomeFieldsOnCurPage(
    data,
    someFields,
    pageNumber,
    visibility
  ) {
    data.forEach((item) => {
      if (item.page === pageNumber) {
        if (someFields.includes(item.name)) {
          item.visible = visibility;
        }
        if (!someFields.includes(item.name)) {
          item.visible = !visibility;
        }
      }
    });
  }

  function setExcludeFieldsVisibility(
    data,
    someFields,
    pageNumber,
    visibility
  ) {
    data.forEach((item) => {
      if (item.page === pageNumber) {
        if (!someFields.includes(item.name)) {
          item.visible = visibility;
          item.readonly = false;
        }
      }
    });
  }

  function setIncludesFieldsVisibility(
    data,
    someFields,
    pageNumber,
    visibility
  ) {
    data.forEach((item) => {
      if (item.page === pageNumber) {
        if (someFields.includes(item.name)) {
          item.visible = visibility;
          item.readonly = false;
        }
      }
    });
  }

  function setVisibleStatusByPage(page, visible = true) {
    data.forEach((item) => {
      if (item.page === page) {
        item.visible = visible;
        item.readonly = false;
      }
    });
  }

  if (isSaved) {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get("page");
    const tabs = [2, 3, 4, 5];

    if (page) {
      const tabShouldBeOpen = tabs.find((item) => item === Number(page));
      const tabsShouldBeClosed = tabs.filter((item) => item !== Number(page));

      const visibleFieldsTransportBlockNoNumber = [
        "SREGNUMTITLE",
        "SREGNUM",
        "IDVEHICLE_POLICY",
        "input_label_err_regnum_not_fou",
        "EMPTY_01",
      ];

      tabsShouldBeClosed.forEach((item) => {
        setVisibleStatusByPage(item, false);
      });

      setVisibleStatusByPage(tabShouldBeOpen, true);

      setReverseVisibleForSomeFieldsOnCurPage(
        data,
        visibleFieldsTransportBlockNoNumber,
        TRANSPORT_BLOCK,
        true
      );
    }

    if (!page) {
      const fieldsShouldNotBeShown = [
        "SBODYNUMBER",
        "BUTTON_NEXT",
        "Save",
        "NWEIGHT",
        "NTONNAGE",
        "NSEATS_COUNT",
      ];

      setExcludeFieldsVisibility(
        data,
        fieldsShouldNotBeShown,
        TRANSPORT_BLOCK,
        true
      );
    }
  }

  const dataCopy = JSON.parse(JSON.stringify(data));

  const dataSet = dataCopy.map((item) => {
    if (item.name === "SREGNUM") {
      return { ...item, afterSave: true };
    }
    return item;
  });

  return dataSet;
}

export { eventHandler, initHandler };

