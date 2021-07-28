class DateDropdown {
  constructor(selector, options) {
    if (selector.length !== 0) {
      this.$root = selector;
      this.options = options;
      this.init();
    }
  }

  init() {
    this.$calendar = this.$root.datepicker(this.options).data('datepicker');
    this.input = this.$root.get(0);
    this.addButtons();
    this.buttons = this.$calendar.$datepicker.find('.js-datepicker__buttons');
    this.clearButton = this.$calendar.$datepicker.find('[data-type="clear"]');
    this.applyButton = this.$calendar.$datepicker.find('[data-type="apply"]');
    const arrow = this.$root[0].nextElementSibling;
    arrow.addEventListener('click', this.handleArrowDropdownClick.bind(this));
    this.input.addEventListener('change', this.handleChangeInput.bind(this));

    this.$root.datepicker({
      onSelect: this.onSelect.bind(this),
      onChangeView: this.onChangeView.bind(this),
    });

    const { smallSize, twoInputs, initialDates } = this.options;
    if (initialDates) this.setInitialDates(initialDates);
    if (smallSize) this.calendarSmallSize();
    if (twoInputs) this.initTwoInputsDropdown();
  }

  initTwoInputsDropdown() {
    this.dateStart = document.querySelector('.js-date-dropdown__day-start');
    this.dateEnd = document.querySelector('.js-date-dropdown__day-end');
    this.dateEndArrow = this.dateEnd.nextElementSibling;

    this.twoInputHandlers();
  }

  twoInputHandlers() {
    this.handleDateEndClick = this.handleDateEndClick.bind(this);

    this.dateEnd.addEventListener('click', this.handleDateEndClick);
    this.dateEndArrow.addEventListener('click', this.handleDateEndClick);
    this.dateEnd.addEventListener('change', this.handleChangeInput.bind(this));
    this.dateEnd.addEventListener('focus', this.handleDateEndFocus.bind(this));
  }

  addButtons() {
    const btnWrap = document.createElement('div');
    const clearBtn = document.createElement('button');
    const applyBtn = document.createElement('button');
    btnWrap.classList.add(
      'datepicker__buttons',
      'js-datepicker__buttons',
    );

    clearBtn.classList.add(
      'button_inline',
      'buttons-dropdown__button_clear',
    );
    clearBtn.setAttribute('type', 'button');
    clearBtn.setAttribute('data-type', 'clear');
    clearBtn.innerHTML = 'Очистить';
    clearBtn.addEventListener('click', this.handleClearButtonClick.bind(this));

    applyBtn.classList.add(
      'button_inline',
      'buttons-dropdown__button_apply',
    );
    applyBtn.setAttribute('type', 'button');
    applyBtn.setAttribute('data-type', 'apply');
    applyBtn.innerHTML = 'Применить';
    applyBtn.addEventListener('click', this.handleApplyButtonClick.bind(this));

    if (this.options.inline) {
      applyBtn.setAttribute('disabled', 'disabled');
    }
    btnWrap.append(clearBtn);
    btnWrap.append(applyBtn);
    this.$calendar.$datepicker.append(btnWrap);
  }

  onSelect(formattedDate) {
    if (formattedDate) {
      this.showClearButton();
    } else {
      this.hideClearButton();
    }

    if (this.options.twoInputs) {
      const dates = formattedDate.split(',');
      const [startDate = '', endDate = ''] = dates;

      this.dateStart.value = startDate;
      this.dateEnd.value = endDate;
    }
  }

  onChangeView(view) {
    if (view === 'months' || view === 'years') {
      this.buttons.hide();
    } else {
      this.buttons.show();
    }
  }

  setInitialDates(dates = []) {
    this.$calendar.selectDate(dates);
  }

  handleChangeInput(event) {
    const { value } = event.target;
    const correctDate = value.split('.').reverse().join('-');

    const dates = [];
    dates.push(new Date(correctDate));
    this.setInitialDates(dates);
  }

  handleClearButtonClick() {
    this.$calendar.clear();
  }

  handleApplyButtonClick() {
    this.$calendar.hide();
  }

  handleDateEndClick() {
    console.log('click');
    this.$calendar.show();
  }

  handleDateEndFocus() {
    console.log('focusin');
    this.$calendar.show();
  }

  handleArrowDropdownClick() {
    console.log('click arrow');
    this.$calendar.show();
  }

  hideClearButton() {
    this.clearButton.removeClass('display');
  }

  showClearButton() {
    this.clearButton.addClass('display');
  }

  hideApplyButton() {
    this.applyButton.removeClass('display');
  }

  showApplyButton() {
    this.applyButton.addClass('display');
  }

  calendarSmallSize() {
    const calendarBody = this.$calendar.$datepicker.get(0);
    calendarBody.classList.add('datepicker--small');
  }
}

export default DateDropdown;
