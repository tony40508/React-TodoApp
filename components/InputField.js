class InputField extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { value: props.value || '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleChange(e) {
        this.setState({ value: e.target.value.substr(0, 20) });
        // 這個元件限制使用者輸入 20 個字，因此透過 handleChange 取得使用者鍵入的值，
        // 並且判斷如果字串太長則修剪，然後再透過 value 將修剪後的資料塞回表單元件！
    }

    handleKeyDown(e) {
        const {
            onKeyDown,
            onSubmitEditing
        } = this.props;
        
        const { value } = this.state;
        switch (e.keyCode) {
            case 13:
                // 如果使用者沒有鍵入任何值（包括都是空白），則不會呼叫 callback
                if (value.trim()) {　
                    onSubmitEditing && onSubmitEditing(value);
                }
                this.setState({ value: '' });
                break;
        }
        // 如果上層元件傳遞 onKeyDown callback，則必須觸發它
        onKeyDown && onKeyDown(e);
    }

    render() {
        // 避免 Unknown Prop Warning ，讓 props 的傳遞更明確
        const { onSubmitEditing, ...inputProps } = this.props; 
        return (
            // 當表單元件為「可控元件」，元件內部不會儲存狀態，因此必須透過 props 傳遞 value，
            // 明確指定表單元件的資料為何（所以當你將 value 指定為一串字串，則無論使用者鍵入什麼值，元件都不會起反應）
            // 當表單元件為「不可控元件」，元件內部會儲存狀態，因此你無法讓應用程式的資料連動影響不可控元件中的狀態
            <input
                {...this.props}
                type="text"
                value={this.state.value}
                onChange={this.handleChange} // 當你有改變表單元件狀態的需求，就使用「可控元件」
                onKeyDown={this.handleKeyDown}
            />
        );
    }
}

InputField.propTypes = {
    onSubmitEditing: React.PropTypes.func
};

window.App.InputField = InputField;